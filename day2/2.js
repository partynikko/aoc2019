const { getInput } = require("../helpers");

const input = getInput(__dirname)
  .split(",")
  .map(Number);

const getProgram = (nums, noun, verb) => {
  const program = [...nums];

  program[1] = noun;
  program[2] = verb;

  let i = 0;
  while (program[i] !== 99) {
    const val1 = program[program[i + 1]];
    const val2 = program[program[i + 2]];
    const output = program[i + 3];

    const val = program[i] === 1 ? val1 + val2 : val1 * val2;
    program[output] = val;

    i += 4;
  }

  return program;
};

for (let i = 0; i <= 99; i++) {
  for (let j = 0; j <= 99; j++) {
    const [val, noun, verb] = getProgram(input, i, j);
    if (val === 19690720) {
      console.log(100 * noun + verb);
      break;
    }
  }
}
