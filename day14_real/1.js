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

const fuel = reactions.get("FUEL");
const test = fuel.needed.reduce((p, [n, c]) => {
  return {
    ...p,
    [c]: n + (p[c] || 0)
  };
}, {});

const getDependencies = c => {
  const { needed } = reactions.get(c);
  const resolved = needed.every(([c]) => c == "ORE");

  console.log("C", c);

  if (resolved) {
    return needed;
  } else {
    return needed.flatMap(([n, c]) =>
      c !== "ORE" ? getDependencies(c) : [n, c]
    );
  }
};

const getDependencies2 = c => {
  const { qty, needed } = reactions.get(c);
  let dependencies = needed;
  while (dependencies.every(([, c]) => c !== "ORE")) {
    dependencies = dependencies.flatMap(([, c]) => getDependencies2(c));
  }
  return dependencies;
};

console.log(reactions);

const ores = [];
const dependencies = fuel.needed;

const abbe = getDependencies("FUEL");
console.log(abbe);

const tabbe = getDependencies2("FUEL");
console.log(tabbe);
