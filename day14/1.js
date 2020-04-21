const { getInput } = require("../helpers");

const input = getInput(__dirname);

const startSignal = input.split("").map(Number);
const basePattern = [0, 1, 0, -1];

const getPattern = base => repeats => {
  const [first, ...pattern] = base.flatMap(n => new Array(repeats).fill(n));
  return [...pattern, first];
};

const getRepeatedPattern = getPattern(basePattern);

const getLastDigit = nums => {
  const sum = nums.reduce((p, c) => p + c);
  const asString = String(sum);
  return Number(asString.charAt(asString.length - 1));
};

const getSignal = signal =>
  signal.map((_, i, signal) => {
    const pattern = getRepeatedPattern(i + 1);
    const values = signal.map((n, j) => {
      const multiplier = pattern[j % pattern.length];
      return n * multiplier;
    });
    return getLastDigit(values);
  });

const part1 = new Array(100)
  .fill()
  .reduce(signal => getSignal(signal), startSignal)
  .slice(0, 8)
  .join("");

console.log(part1);
