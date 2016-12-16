'use strict';

module.exports = class Query {
  constructor(el, model) {
      this.el = el
      this.model = model;
      this.el.on('change', this.react, this)
    }

  react(e) {
      let { name, value, checked, parent } = e.target;
      let opts = this.model.get(name)||[]

      if (checked) {
        opts.push(value)
        parent.style.order = -1
      } else {
        opts.splice(opts.indexOf(value), 1);
        parent.removeAttribute('style')
      }

      let o = {
        skip: 0,
        [ name ]: opts.length ? [ ...opts  ] : null
      }

      this.model.set(o);
      return false
    }
}


