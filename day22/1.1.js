const { getInput } = require("../helpers");
const instructions = getInput(__dirname).split("\n");

const deckSize = 119315717514047;
const maxSize = 2 ** 32;

const test = new Array(maxSize - 1).fill();

console.log(deckSize);

console.log(test);
