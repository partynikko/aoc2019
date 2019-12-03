const { getInput } = require("../helpers");

const wires = getInput(__dirname)
  .split("\n")
  .map(w => w.split(","));

const addV = v => dir => val => {
  if (dir === "U") {
    return [v[0], v[1] + val];
  } else if (dir === "D") {
    return [v[0], v[1] - val];
  } else if (dir === "R") {
    return [v[0] + val, v[1]];
  } else if (dir === "L") {
    return [v[0] - val, v[1]];
  }
};

const sets = [];

for (wire of wires) {
  const set = new Set();
  let pos = [0, 0];
  for (step of wire) {
    const [dir] = step;
    const add = addV(pos)(dir);
    const num = Number(step.slice(1));
    for (let i = 1; i <= num; i++) {
      const coord = add(i);
      set.add(String(coord));
    }
    pos = add(num);
  }
  sets.push(set);
}

const lists = sets.map(set => Array.from(set));
const intersections = lists[0].filter(coord => sets[1].has(coord));

const dist = intersections.reduce((p, coord) => {
  const [x, y] = coord.split(",");
  return Math.min(p, Math.abs(x) + Math.abs(y));
}, Infinity);

const getIndex = hit => list => list.findIndex(pos => pos === hit) + 1;

const steps = intersections.reduce((p, c) => {
  const [steps1, steps2] = lists.map(getIndex(c));
  return Math.min(p, steps1 + steps2);
}, Infinity);

console.log(dist);
console.log(steps);
