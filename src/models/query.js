const Egg = require('../Egg');

class Que extends Egg {

  get skip() {
      return this.get('skip')
    }

  set skip(n) {
    if (n > -1 && n < this.get('total'))
      this.set('skip', n)
  }

  get current() {
    return 0|this.get('skip')/this.get('limit')
  }

  get pages() {
    return 1|this.get('total')/this.get('limit')
  }

  next() {
      return this.skip += this.get('limit')
    }

  prev() {
      return this.skip -= this.get('limit')
    }
}

module.exports = new Que({ skip: 0, limit: 50, total: 626 })