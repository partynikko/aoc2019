const { getInput } = require("../helpers");

const input = getInput(__dirname).split("\n");

const reactions = new Map();

const extractReactions = reaction => {
  const [input, output] = reaction.split(" => ");

  const inputs = input.split(", ").map(str => {
    const [n, c] = str.split(" ");
    return [Number(n), c];
  });
  const [outputN, outputC] = output.split(" ");

  return [inputs, [Number(outputN), outputC]];
};

for (reaction of input) {
  const [needed, [oN, oC]] = extractReactions(reaction);
  reactions.set(oC, { qty: oN, needed });
}

const getDependencies = ([n, c]) => {
  const { needed } = reactions.get(c);
  if (needed.some(([, c]) => c === "ORE")) {
    return [[n, c]];
  } else {
    return needed.flatMap(getDependencies);
  }
};

console.log(reactions);

const dependencies = getDependencies([1, "FUEL"]);
console.log(dependencies);

const test = dependencies.reduce((p, [n, c]) => {
  return {
    ...p,
    [c]: (p[c] || 0) + n
  };
}, {});

const test1 = Object.entries(test).map(([c, n]) => {
  const reaction = reactions.get(c);
  const mult = reaction.needed[0][0];
  return Math.ceil(n / reaction.qty) * mult;
});

const part1 = test1.reduce((p, c) => p + c);

console.log(test);
console.log(test1);
console.log(part1)
