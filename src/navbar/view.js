const model = require('./model');

module.exports = class Navbar {
  constructor(el) {

      this.el = el.on('change input[name=limit]', this.limit, this)
                  .on('click button', this.navigate, this);

      this.model = model.on('change', this.render, this)
                        .on('change:silent', this.render, this);
    }

  render() {
      this.el.find('label.btn').text = this.model.current
      this.el.find('input[name=limit]').value= this.model.get('limit')
    }

  navigate(e) {
      this.model[e.target.name]()
      return false
    }

  limit(e) {
      this.model.set('limit', +e.target.value)
      return false
    }
}

