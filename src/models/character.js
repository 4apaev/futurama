const is = require('is');
const Egg = require('../Egg');
const sync = require('../sync');

module.exports = class Char extends Egg {
  constructor(attrs) {
      super(attrs)
      const diff = this.diff = new Set
      this.on('change', (char, ...args) => args.forEach(diff.add, diff))
    }

  fetch() {
      return sync.find(this.id).then(x => {
        this.set(x.result).diff.clear()
        return this
      })
    }

  update(buf={ }) {
    for(let k of this.diff)
        buf[ k ] = this.get(k)
    return sync.update(this.id, buf).then(x => (this.diff.clear(), x))
  }

  add(name, value) {
      let x = this.get(name)
      if (!is.inn(x, value))
        return this.set({ [name]: x.concat(value) })
    }

  drop(name, value) {
    let x = this.get(name), i = x.indexOf(value);
    if (i > -1) {
      x.splice(i, 1);
      return this.set({ [name]: [...x] })
    }
  }
}