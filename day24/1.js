const getY = i => Math.floor(i / size);
const getX = i => i % size;

const { getInput } = require("../helpers");
const input = getInput(__dirname);

const size = 5;
const startArea = input.split("\n").join("");

const getChar = area => i => area.charAt(i);
const isBug = char => char === "#";
const isEmpty = char => char === ".";

const replaceChar = string => i => char =>
  string.substring(0, i) + char + string.substring(i + 1);

const getAdjacent = i => {
  const top = i - size;
  const right = i + 1;
  const bottom = i + size;
  const left = i - 1;

  const adjacent = [];

  if (getY(top) >= 0) {
    adjacent.push(top);
  }
  if (getX(right) > 0) {
    adjacent.push(right);
  }
  if (getY(bottom) < size) {
    adjacent.push(bottom);
  }
  if (getX(left) < size - 1) {
    adjacent.push(left);
  }

  return adjacent;
};

let area = startArea;
let tempArea = area;

for (let times = 0; times < 4; times++) {
  for (let i = 0; i < area.length; i++) {
    const adjacent = getAdjacent(i).map(getChar(area));
    const bugs = adjacent.filter(isBug);
    const char = area.charAt(i);
    const replace = replaceChar(tempArea)(i);

    if (isBug(char)) {
      if (bugs.length !== 1) {
        tempArea = replace(".");
      }
    } else if (isEmpty(char)) {
      if (bugs.length === 1 || bugs.length === 2) {
        tempArea = replace("#");
      }
    }
  }

  area = tempArea;
}

console.log(area)
