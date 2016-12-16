'use strict';
const is = require('is')
const Vent = require('vent');
const { keys, assign, create, reduce, map, pick, omit, forIn, filter } = require('Util/object')

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

  set(k, v, silent) {
    let changed = is.obj(k) ? reduce(k, this.setup, [], this) : this.setup([], v, k);
    if (changed.length) {
      let evt = silent ? 'change:silent' : 'change'
      changed.forEach(k => this.emit(`${ evt }:${ k }`, this))
      return this.emit(evt, this, ...changed)
    }
    return this;
  }

  has(k) { return k in this.attrs; }
  get(k) { return this.attrs[k]; }

     map(...args) { return  map(this.attrs, ...args) }
    pick(...args) { return pick(this.attrs, ...args) }
    omit(...args) { return omit(this.attrs, ...args) }
           keys() { return keys(this.attrs) }
    each(...args) { return forIn(this.attrs, ...args) }
  reduce(...args) { return reduce(this.attrs, ...args) }
  filter(...args) { return filter(this.attrs, ...args) }

  get id() {
    return this.get('_id')
  }
  set id(id) {
    return this.set('_id', id)
  }
  get json() {
    return assign({}, this.attrs)
  }
}

module.exports = Egg
