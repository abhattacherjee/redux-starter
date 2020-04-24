import reducer from "./reducer";

function createStore(reducer) {
  let state;
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    // call the reducer
    state = reducer(state, action);

    // notify subscribers
    listeners.forEach(l => l());
  }

  function subscribe(listener) {
    listeners.push(listener);
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}

export default createStore(reducer);
