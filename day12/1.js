const { getInput } = require("../helpers");

const moons = getInput(__dirname)
  .split("\n")
  .map(coords => [coords.match(/-?\d{1,}/g).map(Number), [0, 0, 0]]);

const steps = 1000;

const pairs = [];

for (let i = 0; i < moons.length; i++) {
  for (let j = i + 1; j < moons.length; j++) {
    pairs.push([i, j]);
  }
}

for (let i = 0; i < steps; i++) {
  pairs.forEach(([a, b]) => {
    const m1 = moons[a];
    const m2 = moons[b];
    for (let i = 0; i < 3; i++) {
      if (m1[0][i] < m2[0][i]) {
        m1[1][i] = m1[1][i] + 1;
        m2[1][i] = m2[1][i] - 1;
      } else if (m1[0][i] > m2[0][i]) {
        m1[1][i] = m1[1][i] - 1;
        m2[1][i] = m2[1][i] + 1;
      }
    }
  });

  moons.forEach(moon => {
    for (let i = 0; i < 3; i++) {
      moon[0][i] = moon[0][i] + moon[1][i];
    }
  });
}

const energies = moons.map(moon => {
  const calcEnergy = (p, c) => p + Math.abs(c);
  const potential = moon[0].reduce(calcEnergy, 0);
  const kinetic = moon[1].reduce(calcEnergy, 0);
  return potential * kinetic;
});

const part1 = energies.reduce((p, c) => p + c);

console.log(moons);
console.log(pairs);
console.log(energies);
console.log(part1);
