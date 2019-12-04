const { getInput } = require("../helpers");

const input = getInput(__dirname).split("-");

const start = Number(input[0]);
const stop = Number(input[1]);

const hasDecrements = string =>
  string
    .split("")
    .some((n, i, ns) => (i > 0 ? Number(n) < Number(ns[i - 1]) : false));

const getPairs = string => string.match(/(\d)\1{1,}/g) || [];
const hasEvenPairs = string => getPairs(string).some(n => n.length === 2);

const range = new Array(stop - start + 1)
  .fill()
  .map((_, i) => String(i + start));

const withoutDecrements = range.filter(num => !hasDecrements(num));

const solution1 = withoutDecrements.filter(num => getPairs(num).length > 0)
  .length;

const solution2 = withoutDecrements.filter(hasEvenPairs).length;

console.log(solution1);
console.log(solution2);
