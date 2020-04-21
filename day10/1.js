const { getInput } = require("../helpers");

const input = getInput(__dirname);

const getAngle = ([ox, oy]) => ([tx, ty]) => Math.atan2(ty - oy, tx - ox);

const asteroids = input
  .split("\n")
  .flatMap((row, x) => row.split("").map((c, y) => (c === "#" ? [x, y] : null)))
  .filter(Boolean);

const detected = asteroids.map((asteroid, _, asteroids) => {
  const angleFromAst = getAngle(asteroid);
  return new Set(asteroids.filter(ast => ast !== asteroid).map(angleFromAst))
    .size;
});

const result = Math.max(...detected);
console.log(result);
