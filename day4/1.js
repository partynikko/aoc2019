const { getInput } = require("../helpers");

const range = getInput(__dirname).split("-");

const start = Number(range[0]);
const stop = Number(range[1]);

let match = [];
for (let num = start; num <= stop; num++) {
  const hasPair = new RegExp(/(\d)\1{1}/g).test(num);
  if (hasPair) {
    const notDecreasing = String(num)
      .split("")
      .every((n, i, arr) => (i > 0 ? Number(n) >= Number(arr[i - 1]) : true));
    if (notDecreasing) {
      match.push(num);
    }
  }
}

console.log(match.length);
