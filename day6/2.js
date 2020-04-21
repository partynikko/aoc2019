const { getInput } = require("../helpers");

const orbits = getInput(__dirname)
  .split("\n")
  .map(str => str.split(")"));

const relations = new Map(orbits.map(pair => pair.reverse()));

const start = relations.get("YOU");
const end = relations.get("SAN");

let count1 = 0;
let count2 = 0;

let prev = start;
let curr = end;

while (prev !== "COM") {
  while (curr !== "COM" && curr !== prev) {
    curr = relations.get(curr);
    count2++;
  }
  if (prev === curr) {
    break;
  }
  prev = relations.get(prev);
  curr = end;

  count1++;
  count2 = 0;
}

console.log(count1 + count2);
