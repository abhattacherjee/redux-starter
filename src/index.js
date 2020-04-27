import configureStore from "./store/configureStore";
import { loadBugs, addBug, assignBug, resolveBug } from "./store/bugs";

const store = configureStore();
// store.dispatch(loadBugs());

store.dispatch(addBug({ description: "bug x" }));
setTimeout(() => store.dispatch(loadBugs()), 2000);
setTimeout(() => store.dispatch(assignBug({ id: 4 }, 1)), 5000);
setTimeout(
  () => store.dispatch(resolveBug({ id: 1587844673076, resolved: true })),
  10000
);
