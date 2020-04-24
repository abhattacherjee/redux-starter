function add(a) {
  return function (b) {
    return a + b;
  };
}
const add2 = a => b => a + b;

// currying -> converts a function with N arguments to a function with 1 argument
