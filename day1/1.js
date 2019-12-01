const { getInput } = require('../helpers')

const result = getInput(__dirname)
  .split('\n')
  .reduce((fuel, mass) => Math.floor(Number(mass) / 3) - 2 + fuel, 0)

console.log(result)
