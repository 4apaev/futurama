const is = require('is');
const Model = require('./model');

module.exports = class Navbar {
  constructor(el) {
      this.el = el
      let { max, min, value } = this.el.find('input')

      this.model = new Model(+min, +value, +max);

      this.el.on('change input', this.limit, this)
      this.el.on('click button', this.navigate, this)
    }

  navigate(e) {
      return is.result(this.model, e.target.name)
    }

  limit(e) {
      return this.model.set('limit', +e.target.value)
    }
}

