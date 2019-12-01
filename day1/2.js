const { getInput } = require('../helpers')

const calcFuel = num => {
  const fuel = Math.floor(num / 3) - 2
  return fuel > 0 ? calcFuel(fuel) + fuel : 0
}

const result = getInput(__dirname)
  .split('\n')
  .reduce((total, mass) => calcFuel(Number(mass)) + total, 0)

console.log(result)
