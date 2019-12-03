const { getInput } = require("../helpers");

const wires = getInput(__dirname)
  .split("\n")
  .map(w => w.split(","));

const sets = [new Set(), new Set()];

wires.forEach((wire, i) => {
  let pos = [0, 0];
  const set = sets[i];

  for (v of wire) {
    const coord = [...pos];
    const [dir] = v;
    const step = Number(v.slice(1));
    if (dir === "U") {
      coord[1] += step;
    } else if (dir === "D") {
      coord[1] -= step;
    } else if (dir === "R") {
      coord[0] += step;
    } else if (dir === "L") {
      coord[0] -= step;
    }

    for (
      let x = pos[0];
      coord[0] < pos[0] ? x >= coord[0] : x <= coord[0];
      coord[0] < pos[0] ? x-- : x++
    ) {
      for (
        let y = pos[1];
        coord[1] < pos[1] ? y >= coord[1] : y <= coord[1];
        coord[1] < pos[1] ? y-- : y++
      ) {
        if (x !== pos[0] || y !== pos[1]) {
          const str = String(x) + "x" + String(y);
          set.add(str);
        }
      }
    }

    pos = coord;
  }
});

const lists = sets.map(set => Array.from(set));

const steps = lists[0]
  .filter(pos => sets[1].has(pos))
  .map(hit => {
    const steps1 = lists[0].findIndex(pos => pos === hit) + 1;
    const steps2 = lists[1].findIndex(pos => pos === hit) + 1;
    return steps1 + steps2;
  })
  .reduce((p, c) => Math.min(p, c));

console.log(steps);
