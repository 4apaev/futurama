const Egg = require('../Egg');

module.exports = class Que extends Egg {
  get json() {
    return this.map((v, k) => {
      return { '$in': v }
    })
  }
}