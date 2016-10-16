'use strict';
const is = require('is')
const Vent = require('vent');
const { assign, create, reduce, map, pick, omit } = require('Util/object')

class Egg extends Vent {
  constructor(attrs) {
      super()
      this.attrs = create();
      attrs && this.set(attrs)
    }

  setup(changed, v, k) {
    if (this.get(k) !== v) {
      if (is.def(v)) {
        this.attrs[k] = v
        changed.push(k)
      } else if (this.has(k)) {
        delete this.attrs[k]
        changed.push(k)
      }
    }
    return changed
  }

  set(k, v) {
    let changed = is.obj(k) ? reduce(k, this.setup, [], this) : this.setup([], v, k);
    if (changed.length) {
      changed.forEach(k => this.emit('change:'+k, this))
      return this.emit('change', this)
    }
    return this;
  }

  has(k) { return is.def(k) && k in this.attrs; }
  get(k) { return this.attrs[k]; }

   map(...args) { return  map(this.attrs, ...args) }
  pick(...args) { return pick(this.attrs, ...args) }
  omit(...args) { return omit(this.attrs, ...args) }

  get json() { return assign({}, this.attrs); }
}

module.exports = Egg


  // parse(x) { return this.set(x) }

  // fetch(url=this.url) {
  //   return sync.get(url)
  //               .accept('json')
  //               .end(x => this.parse(x))
  // }

  // post(url=this.url) {
  //   return sync.post(url)
  //               .accept('json')
  //               .send(this.json)
  //               .end()
  // }