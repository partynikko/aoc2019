const { getInput } = require("../helpers");
const input = getInput(__dirname);

const map = input.split("\n");
const length = map[0].length;
const height = map.length;

console.log(map, length, height);

const keys = new Map();

for (let x = 0; x < length; x++) {
  for (let y = 0; y < height; y++) {
    const charCode = map[y][x].charCodeAt(0);
    if (charCode >= 65 && charCode <= 122) {
      keys.set(map[y][x], [x, y]);
    }
  }
}

console.log(keys)

const startPos = map.join("\n").indexOf('@')
console.log(startPos)

/* 
const pois = new Map();

for (let y = 0; y < map.length; y++) {
  for (let x = 0; x < map[0].length; x++) {
    const char = map[y][x];
    if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 122) {
      pois.set(char, [x, y]);
    }
  }
}

console.log(map);
console.log(pois); */
