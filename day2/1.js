const { getInput } = require("../helpers");

const program = getInput(__dirname)
  .split(",")
  .map(Number);

program[1] = 12;
program[2] = 2;

let i = 0;
while (program[i] === 1 || program[i] === 2) {
  const val1 = program[program[i + 1]];
  const val2 = program[program[i + 2]];
  const output = program[i + 3];

  const val = program[i] === 1 ? val1 + val2 : val1 * val2;
  program[output] = val;

  i += 4;
}

console.log(program[0]);
