const fs = require('fs')
const path = require('path')

module.exports = {
  getInput: dir =>
    fs.readFileSync(path.resolve(dir, 'input.txt')).toString(),
}
