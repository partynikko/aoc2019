const { getInput } = require("../helpers");
const instructions = getInput(__dirname).split("\n");

const INCREMENT = "increment";
const CUT = "cut";
const NEW = "new";

const getInstruction = instruction => {
  const inst = instruction.split(" ");
  if (inst.includes(INCREMENT)) {
    return [INCREMENT, Number(inst[3])];
  } else if (inst.includes(CUT)) {
    return [CUT, Number(inst[1])];
  } else if (inst.includes(NEW)) {
    return [NEW];
  }
};

const deckSize = 119315717;

const newDeck = () => new Array(deckSize).fill();

let deck = newDeck().map((_, i) => i);
let table = newDeck();

for (const instruction of instructions) {
  const [inst, val] = getInstruction(instruction);
  if (inst === NEW) {
    deck = [...deck].reverse();
  }
  if (inst === INCREMENT) {
    table[0] = deck[0];
    for (let i = 1; i < deck.length; i++) {
      const pos = (i * val) % table.length || table.length - 1;
      table[pos] = deck[i];
    }
    deck = [...table];
    table = newDeck();
  }
  if (inst === CUT) {
    const cutDeck = [...deck];
    if (val < 0) {
      const unit = cutDeck.splice(cutDeck.length - Math.abs(val));
      deck = [...unit, ...cutDeck];
    } else {
      const unit = cutDeck.splice(0, val);
      deck = [...cutDeck, ...unit];
    }
  }
}

const result = deck.findIndex(n => n === 2019);
console.log(result);
