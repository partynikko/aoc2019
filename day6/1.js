const { getInput } = require("../helpers");

const orbits = getInput(__dirname)
  .split("\n")
  .map(str => str.split(")"));

const relations = new Map(orbits.map(([k, v]) => [v, k]));

const getNext = map => key => map.get(key);
const getMap = getNext(relations);
const getSteps = (key, count = 0) =>
  key && key !== "COM" ? getSteps(getMap(key), count + 1) : count;

const result = Array.from(relations.values()).reduce(
  (count, obj) => count + getSteps(obj),
  relations.size
);

console.log(result);

let count = relations.size;

relations.forEach(v => {
  let prev = v;
  while (prev && prev !== "COM") {
    prev = relations.get(prev);
    count++;
  }
});

console.log(count);
console.log(result);
