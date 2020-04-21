const { getInput } = require("../helpers");

const width = 25;
const height = 6;

const getRegExp = n => new RegExp(`.{${n}}`, "g");

const input = getInput(__dirname);

const uniqueNumbers = new Set(input.split(""));
const startList = new Array(uniqueNumbers.size).fill().map(() => 0);

const layers = input.match(getRegExp(width * height)).map(layer =>
  layer.split("").reduce((p, c) => {
    const l = [...p];
    l[c] = l[c] + 1;
    return l;
  }, startList)
);

const fewest0 = layers.reduce((l1, l2) => (l1[0] <= l2[0] ? l1 : l2));
const result = fewest0[1] * fewest0[2];

console.log(result);
