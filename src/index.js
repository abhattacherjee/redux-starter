import configureStore from "./store/configureStore";
import { userAdded } from "./store/users";

import {
  bugAdded,
  bugResolved,
  bugAssigned,
  getUnresolvedBugs,
  getBugsByUser,
} from "./store/bugs";
import { projectAdded, projectRemoved } from "./store/projects";

const store = configureStore();

store.dispatch({ type: "error", payload: { message: "this is an error!!" } });
// store.dispatch((dispatch, getState) => {
//   // call an api endpoint
//   // when promise resolved, then dispatch an action
//   dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
//   console.log(getState());
//   // when promise is rejected, then dispatch an action
// });

// register subscribers
// store.subscribe(() => console.log("state changed: ", store.getState()));

// dispatch an action
// store.dispatch(userAdded({ name: "Abhishek" }));
// store.dispatch(userAdded({ name: "Jennifer" }));
// store.dispatch(userAdded({ name: "Blake" }));
//
// store.dispatch(bugAdded({ description: "bug 1" }));
// store.dispatch(bugAdded({ description: "bug 2" }));
// store.dispatch(bugAdded({ description: "bug 3" }));
// store.dispatch(bugResolved({ id: 2 }));
//
// store.dispatch(bugAssigned({ id: 1, userId: 1 }));
// store.dispatch(bugAssigned({ id: 3, userId: 3 }));
//
// const unresolvedBugs = getUnresolvedBugs(store.getState());
// console.log("Unresolved bugs", unresolvedBugs);
//
// const bugs = getBugsByUser(1)(store.getState());
// console.log("Bugs assigned to 1", bugs);
//
// store.dispatch(projectAdded({ name: "Project 1" }));
// store.dispatch(projectAdded({ name: "Project 2" }));
// store.dispatch(projectAdded({ name: "Project 3" }));
// store.dispatch(projectRemoved({ id: 2 }));

// define your actions
// define your reducers
// instantiate configureStore with reducer

// subscribe to the configureStore
// dispatch actions to the configureStore

// subscribers will be notified when the state changes
