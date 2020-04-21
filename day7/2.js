const { getInput } = require("../helpers");

const program = getInput(__dirname)
  .split(",")
  .map(Number);

function getAllPermutations(string) {
  var results = [];

  if (string.length === 1) {
    results.push(string);
    return results;
  }

  for (var i = 0; i < string.length; i++) {
    var firstChar = string[i];
    var charsLeft = string.substring(0, i) + string.substring(i + 1);
    var innerPermutations = getAllPermutations(charsLeft);
    for (var j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }
  return results;
}

const allPhases = getAllPermutations("01234").map(str =>
  str.split("").map(Number)
);

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

const getSignal = phases => {
  let signal = 0;
  let doFeedback = true;
  let a = 0;
  let loops = [];
  while (doFeedback) {
    console.log(a)
    if (loops.length <= a) {
      program[program[1]] = phases[a];
      loops.push(a);
    } else {
      program[program[1]] = signal;
    }
    let i = 2;
    while (program[i] !== 99) {
      const [op, m1, m2] = getCodes(program[i]);

      if (op === 99) {
        doFeedback = false;
        break;
      }

      const mode = getModeValue(program)(i);
      const mWith1 = mode(1)(m1);
      const mWith2 = mode(2)(m2);

      const inc = n => (i += n);
      const incCond = v1 => v2 => bool => (bool ? (i = v1) : inc(v2));
      const incCond56 = incCond(mWith2)(3);

      const write = j => val => (program[program[i + j]] = val);
      const writeCond = v1 => v2 => bool => write(3)(bool ? v1 : v2);
      const writeCond12 = writeCond(mWith1 + mWith2)(mWith1 * mWith2);
      const writeCond78 = writeCond(1)(0);
      const write3 = val => write(1)(val);

      switch (op) {
        case 1:
        case 2:
          writeCond12(op === 1);
          inc(4);
          break;
        case 3:
          write3(signal);
          inc(2);
          break;
        case 4:
          if (mWith1 > 0) {
            console.log(mWith1);
            signal = mWith1;
          }
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
    a = (a + 1) % phases.length;
  }
  return signal;
};
/* 
const allSignals = allPhases.map(getSignal);
const result = Math.max(...allSignals);

console.log(result);
 */

const test = getSignal([9, 8, 7, 6, 5]);
console.log(test);
