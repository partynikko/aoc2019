const { performance } = require("perf_hooks");
const { getInput } = require("../helpers");
const start = performance.now();

const wires = getInput(__dirname)
  .split("\n")
  .map(w => w.split(","));

const addV = v => dir => val => {
  switch (dir) {
    case "U":
      return [v[0], v[1] + val];
    case "D":
      return [v[0], v[1] - val];
    case "R":
      return [v[0] + val, v[1]];
    case "L":
      return [v[0] - val, v[1]];
  }
};

const sets = wires.map(wire => {
  const coordinates = wire
    .reduce(
      (coords, step) => {
        const pos = coords[coords.length - 1];
        const dir = step[0];
        const add = addV(pos)(dir);
        const num = Number(step.slice(1));
        return [...coords, ...new Array(num).fill().map((_, i) => add(i + 1))];
      },
      [[0, 0]]
    )
    .slice(1)
    .map(String);

  return new Set(coordinates);
});

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
const stop = performance.now();

console.log((stop - start) / 1000);