const { getInput } = require("../helpers");

const width = 25;
const height = 6;

const getRegExp = n => new RegExp(`.{${n}}`, "g");

const input = getInput(__dirname);
const layers = input.match(getRegExp(width * height));

const part1 = layers
  .map(layer =>
    layer.split("").reduce(
      (p, c) => {
        const l = [...p];
        l[c] = l[c] + 1;
        return l;
      },
      [0, 0, 0]
    )
  )
  .reduce((l1, l2) => (l1[0] <= l2[0] ? l1 : l2));

console.log(part1[1] * part1[2]);

const emptyImage = new Array(width * height).fill();
const fullImage = emptyImage.map(
  (_, i) => layers.find(layer => layer[i] !== "2")[i]
);

const part2 = fullImage.join("").match(getRegExp(width));
console.log(part2);
