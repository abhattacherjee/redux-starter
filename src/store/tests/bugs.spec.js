import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { addBug, loadBugs, resolveBug, getUnresolvedBugs } from "../bugs";
import configureStore from "../configureStore";

describe("bugsSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    //configure mock
    fakeAxios = new MockAdapter(axios);

    // get store instance and dispatch an action
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;
  const createState = () => ({
    entities: {
      bugs: {
        list: [],
      },
    },
  });

  // steps
  // 1. dispatch an action
  // 2. check the state in the store

  it("should add the bug to the store if it is saved to the server", async () => {
    const bug = { description: "a" };
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    await store.dispatch(addBug(bug));

    expect(bugsSlice().list).toContainEqual(savedBug);
  });

  it("should not add the bug to the store if it is not saved to the server", async () => {
    const bug = { description: "a" };
    fakeAxios.onPost("/bugs").reply(500);

    await store.dispatch(addBug(bug));

    expect(bugsSlice().list).toHaveLength(0);
  });

  it("update the bug as resolved in the store when it is saved in the server", async () => {
    const bug = { description: "a" };
    const savedBug = { ...bug, id: 1 };
    const resolvedBug = { ...savedBug, resolved: true };
    fakeAxios.onPost("/bugs").reply(200, savedBug);
    fakeAxios.onPatch("/bugs/1").reply(200, resolvedBug);

    await store.dispatch(addBug(bug));
    await store.dispatch(resolveBug(savedBug.id));

    expect(bugsSlice().list[0].resolved).toBe(true);
  });

  describe("loading bugs", () => {
    describe("if the bugs exist in the cache", () => {
      it("should return the data from the cache", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe("if the bugs don't exist in the cache", () => {
      it("should load all bugs from the server into the store", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }, { id: 2 }, { id: 3 }]);

        await store.dispatch(loadBugs());

        expect(bugsSlice().list).toHaveLength(3);
      });

      describe("loading indicator", () => {
        it("should be true when fetching bugs", () => {
          fakeAxios.onGet("/bugs").reply(() => {
            expect(bugsSlice().loading).toBe(true);
            return [200, [{ id: 1 }, { id: 2 }, { id: 3 }]];
          });
          store.dispatch(loadBugs());
        });

        it("should be false after fetching bugs", async () => {
          fakeAxios
            .onGet("/bugs")
            .reply(200, [{ id: 1 }, { id: 2 }, { id: 3 }]);
          await store.dispatch(loadBugs());
          expect(bugsSlice().loading).toBe(false);
        });

        it("should be false if the server returns an error", async () => {
          fakeAxios.onGet("/bugs").reply(500);
          await store.dispatch(loadBugs());
          expect(bugsSlice().loading).toBe(false);
        });
      });
    });
  });

  describe("selectors", () => {
    it("should return unresolved bugs", () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 2 },
        { id: 3 },
      ];

      const result = getUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });
  });
});
