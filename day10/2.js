const { getInput } = require("../helpers");

const input = getInput(__dirname);

const sortByDist = ([ox, oy]) => ([x1, y1], [x2, y2]) =>
  Math.hypot(ox - x1, oy - y1) - Math.hypot(ox - x2, oy - y2);

const getAngle = ([ox, oy]) => ([tx, ty]) => Math.atan2(ty - oy, tx - ox);
const getRotatedAngle = t => t + Math.PI / 2;
const getNormalizedAngle = t => (t < 0 ? t + Math.PI * 2 : t);

const asteroids = input
  .split("\n")
  .flatMap((row, y) => row.split("").map((c, x) => (c === "#" ? [x, y] : null)))
  .filter(Boolean);

const relations = asteroids.map((asteroid, i, allAsteroids) => [
  asteroid,
  [...allAsteroids.slice(0, i), ...allAsteroids.slice(i + 1)]
]);

const asteroidVisions = relations.map(
  ([asteroid, asteroids]) => new Set(asteroids.map(getAngle(asteroid))).size
);

const part1 = Math.max(...asteroidVisions);

const [base, otherAsteriods] = relations[
  asteroidVisions.findIndex(n => n === part1)
];

const baseAngle = getAngle(base);
const grouped = otherAsteriods.reduce((p, c) => {
  const angle = baseAngle(c);
  return {
    ...p,
    [angle]: [...(angle in p ? p[angle] : []), c]
  };
}, {});

console.log(grouped);

const test = Object.entries(grouped)
  .map(([t, asteroids]) => {
    const normalized = getNormalizedAngle(getRotatedAngle(Number(t)));
    const astByDist = [...asteroids].sort(sortByDist(base));
    return [normalized, astByDist];
  })
  .sort(([t1], [t2]) => t1 - t2);

console.log(test);

const toShoot = Object.values(Object.fromEntries(test));

console.log(toShoot);

const hits = [];

let i = 0;
while (toShoot.some(l => l.length > 0)) {
  const hit = toShoot[i].shift();
  if (hit) {
    hits.push(hit);
  }
  i = (i + 1) % toShoot.length;
}

console.log(hits);

const hit200th = hits[199];
const part2 = hit200th[0] * 100 + hit200th[1];
console.log(part2)
