const { performance } = require("perf_hooks");

const { getInput } = require("../helpers");

const input = getInput(__dirname);

const startSignal = input.split("").map(Number);
const basePattern = [0, 1, 0, -1];

const getPattern = base => repeats => {
  const [first, ...pattern] = base.flatMap(n => new Array(repeats).fill(n));
  return [...pattern, first];
};

const getPattern2 = base => repeats => {
  const arr = [];
  for (let i = 0; i < base.length; i++) {
    arr[i] = Array(repeats).fill(i);
  }
  console.log(arr)
  const first = arr.splice(0, 1);
  return arr.push(first);
};

const getRepeatedPattern = getPattern2(basePattern);

const getLastDigit = nums => {
  const sum = nums.reduce((p, c) => p + c);
  const asString = String(sum);
  return Number(asString.charAt(asString.length - 1));
};

const getSignal2 = signal => {
  let arr = [];
  for (let i = 0; i < signal.length; i++) {
    const pattern = getRepeatedPattern(i + 1);
    const values = [];
    for (let j = 0; j < signal.length; j++) {
      values[j] = signal[j] * pattern[j % pattern.length];
    }
    arr[i] = getLastDigit(values);
  }
  return arr;
};

const p1 = performance.now();
let signal = startSignal;
for (let i = 0; i < 4; i++) {
  signal = getSignal2(signal);
}
const part1 = signal.slice(0, 8).join("");
const p2 = performance.now();

console.log(part1, p2 - p1);
