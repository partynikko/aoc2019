const { getInput } = require("../helpers");

const program = getInput(__dirname)
  .split(",")
  .map(Number);

const getCodes = code => {
  const chars = String(code)
    .padStart(5, "0")
    .split("");
  return [chars.slice(-2).join(""), ...chars.slice(0, -2).reverse()].map(
    Number
  );
};

const getModeValue = program => i => j => mode =>
  program[mode === 0 ? program[i + j] : i + j];

const input = 5;
program[program[1]] = input;

let i = 2;
while (program[i] !== 99) {
  const [op, m1, m2] = getCodes(program[i]);

  const mode = getModeValue(program)(i);
  const mWith1 = mode(1)(m1);
  const mWith2 = mode(2)(m2);

  const inc = n => (i += n);
  const incCond = v1 => v2 => bool => (bool ? (i = v1) : inc(v2));
  const incCond56 = incCond(mWith2)(3);

  const write = val => (program[program[i + 3]] = val);
  const writeCond = v1 => v2 => bool => write(bool ? v1 : v2);
  const writeCond12 = writeCond(mWith1 + mWith2)(mWith1 * mWith2);
  const writeCond78 = writeCond(1)(0);

  switch (op) {
    case 1:
    case 2:
      writeCond12(op === 1);
      inc(4);
      break;
    case 4:
      mWith1 > 0 && console.log(mWith1);
      inc(2);
      break;
    case 5:
      incCond56(mWith1 !== 0);
      break;
    case 6:
      incCond56(mWith1 === 0);
      break;
    case 7: {
      writeCond78(mWith1 < mWith2);
      inc(4);
      break;
    }
    case 8: {
      writeCond78(mWith1 === mWith2);
      inc(4);
      break;
    }
  }
}
