const { getInput } = require("../helpers");

const range = getInput(__dirname).split("-");

const start = Number(range[0]);
const stop = Number(range[1]);

let matches = 0;

for (let num = start; num <= stop; num++) {
  const str = String(num).split("");
  const hasPair = str.some((n, i, arr) => n === arr[i - 1]);
  if (hasPair) {
    const notDecreasing = str.every((n, i, arr) =>
      i > 0 ? Number(n) >= Number(arr[i - 1]) : true
    );
    if (notDecreasing) {
      matches += 1;
    }
  }
}

console.log(matches);
