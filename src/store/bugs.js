import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import * as actions from "./api";
import _ from "lodash";
import moment from "moment";

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now();
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },
    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: action.payload.id,
        description: action.payload.description,
        resolved: action.payload.resolved,
      });
    },
    bugRemoved: (bugs, action) => {
      _.remove(bugs, bug => bug.id === action.payload.id);
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
    bugAssigned: (bugs, action) => {
      const index = bugs.list.findIndex(bug => bug.id === action.payload.id);
      bugs.list[index].userId = action.payload.userId;
    },
  },
});

const {
  bugsRequested,
  bugsReceived,
  bugsRequestFailed,
  bugAdded,
  bugResolved,
  bugRemoved,
  bugAssigned,
} = slice.actions;
// export default slice.reducer;

//selector
export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  bugs => bugs.list.filter(bug => !bug.resolved)
);

export const getBugsByUser = userId =>
  createSelector(
    state => state.entities.bugs,
    bugs => bugs.list.filter(bug => bug.userId === userId)
  );

// action creators
// () => fn(dispatch, action) thunk
export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  if (diffInMinutes < 10) return;

  dispatch(
    actions.apiCallBegan({
      url: "/bugs",
      method: "get",
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  );
};

export const addBug = bug =>
  actions.apiCallBegan({
    url: "/bugs",
    method: "post",
    data: bug,
    onSuccess: bugAdded.type,
  });

export const assignBug = (bug, userId) =>
  actions.apiCallBegan({
    url: `/bugs/${bug.id}`,
    method: "patch",
    data: { userId },
    onSuccess: bugAssigned.type,
  });

export const resolveBug = bug =>
  actions.apiCallBegan({
    url: `/bugs/${bug.id}`,
    method: "patch",
    data: { resolved: bug.resolved },
    onSuccess: bugResolved.type,
  });
