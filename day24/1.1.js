const { getInput } = require("../helpers");
const input = getInput(__dirname);

const size = 5;
const startArea = input.split("\n").map(row => row.split(""));

const getAdjacent = x => y => [
  [x, y - 1],
  [x + 1, y],
  [x, y + 1],
  [x - 1, y]
];

const getChar = area => y => x => area[y][x];
const isBug = char => char === "#";
const isEmpty = char => char === ".";

let area = startArea;
let secondArea = area;

for (let y = 0; y < size; y++) {
  const withY = getAdjacent(y);
  for (let x = 0; x < size; x++) {
    const withX = withY(x);
    const adjacent = withX;
    console.log(adjacent)
    const char = getChar(area)(y)(x);
    if (isBug(char)) {
    } else if (isEmpty(char)) {
    }
  }
}

console.log(startArea);
