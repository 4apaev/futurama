// const crumbs = require('../templates/breadcrumbs')
const { reduce } = require('Util/object')

module.exports = class Navbar {
  constructor(el, model) {
      this.el = el
      this.model = model

      this.model.on('change', this.render, this)
      this.model.on('change:silent', this.render, this);

      this.el.on('change input[name=limit]', this.limit, this)
      this.el.on('click button', this.navigate, this);

      this.render();
    }

  render() {
      this.el.find('label.btn').text = `${ this.model.current } / ${ this.model.pages }`
      this.el.find('input[name=limit]').value= this.model.get('limit')
      // this.el.find('#breadcrumbs').html = this.breadcrumbs()
    }

  // breadcrumbs() {
  //     return reduce(this.model.omit('total', 'limit', 'skip'), (buf, arr, name) => buf+=crumbs(name, arr), '')
  //   }

  navigate(e) {
      this.model[e.target.name]()
      return false
    }

  limit(e) {
      this.model.set('limit', +e.target.value)
      return false
    }
}

