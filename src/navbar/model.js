const Egg = require('../Egg');

class Nav extends Egg {

  get skip() {
      return this.get('skip')
    }

  set skip(n) {
    if (n > -1 && n < this.get('total'))
      this.set('skip', n)
  }

  get current() {
    return this.get('skip') / this.get('limit')
  }

  next() {
      return this.skip += this.get('limit')
    }
  prev() {
      return this.skip -= this.get('limit')
    }
}

module.exports = new Nav({ skip: 0, limit: 20, total: 626 })