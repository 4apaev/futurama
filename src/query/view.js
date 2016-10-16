const Model = require('./model');

module.exports = class Query {
  constructor(el) {
      this.el = el
      this.model = new Model;
      this.el.on('change select', this.react, this)
    }

  react(e) {
      let { name, selectedOptions } = e.target;
      return this.model.set(name, this.getSelected(selectedOptions))
    }

  getSelected(opts) {
      return opts.length ? opts.map(x => x.value) : null;
    }
}

