const Egg = require('../Egg');

module.exports = class Nav extends Egg {
  constructor(skip=0, limit=10, total=626) {
    super({ skip, limit, total })
  }

  get skip() {
      return this.get('skip')
    }

  set skip(n) {
    if (n > -1 && n < this.get('total'))
      this.set('skip', n)
  }

  next() {
      return this.skip += this.get('limit')
    }
  prev() {
      return this.skip -= this.get('limit')
    }
}