'use strict';

const is       = require('is');
const declare  = require('declare');
const O = require('Util/object')
const { keys, assign, create } = Object;



const is = require('is')
const { keys, create } = Object;

class Store {
  constructor(attrs) {
      this.attrs = create(null);
      this.assign(attrs)
    }

  has(k) {
      return is.def(k) && k in this.attrs;
    }

  get(k) {
      return is.def(k) ? this.attrs[k] : k;
    }

  set(k, v) {
      let changed = is.def(v) && this.get(k)!=v;
      changed && (this.attrs[k] = v);
      return changed;
    }

  assign(o) {
      let changed = Store.filter(o, this.set, this);
      return !!changed.length
    }

  delete(k) {
      let deleted = this.has(k) && delete this.attrs[k];
      return deleted;
    }

    static filter(o, cb, ctx) {
      return is.obj(o) ? keys(o).filter(k => cb.call(ctx, k, o[k])) : []
    }
}

module.exports = Store