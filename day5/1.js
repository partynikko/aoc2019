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

const getInstructionsLength = op => (op <= 2 ? 4 : 2);

const getModeValue = program => i => j => mode =>
  program[mode === 0 ? program[i + j] : i + j];

const getCalc = op => v1 => v2 => (op === 1 ? v1 + v2 : v1 * v2);

const input = 1;
program[program[1]] = input;

let i = 2;
while (program[i] !== 99) {
  const [op, m1, m2] = getCodes(program[i]);

  const mode = getModeValue(program)(i);
  const mWith1 = mode(1)(m1);
  const mWith2 = mode(2)(m2);

  switch (op) {
    case 1:
    case 2:
      const [v1, v2] = [mWith1, mWith2];
      const val = getCalc(op)(v1)(v2);
      program[program[i + 3]] = val;
      break;
    case 4:
      mWith1 > 0 && console.log(mWith1);
      break;
  }

  i += getInstructionsLength(op);
}
