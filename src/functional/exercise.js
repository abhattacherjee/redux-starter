import { pipe } from "lodash/fp";

const input = { tag: "Javascript" };
// extract the value
// convert to lowercase
// encapsulate in braces
// encapsulate in double quotes

const extractValue = field => input => input[field];

const toLowerCase = input => input.toLowerCase();

const encapsulate = (...symbol) => input =>
  symbol.length === 2
    ? `${symbol[0]}${input}${symbol[1]}`
    : `${symbol[0]}${input}${symbol[0]}`;

const convert = pipe(
  extractValue("tag"),
  toLowerCase,
  encapsulate("{", "}"),
  encapsulate('"')
);
const result = convert(input);

console.log(result);
