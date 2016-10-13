const is       = require('is');
const Model = require('./model')
const { keys, assign, create } = Object;

module.exports = class View {

  constructor(el, table) {
      this.el = el
      this.table = table
      this.list = []
      this.model = new Model(500, 0)
      this.render = this.render.bind(this)

      this.el.on('change', this.react, this)
    }

  render() {
    this.table.html = this.list.map(o => `<a href="#character/${ o._id }">${ o.name }</a>`).join('')
    return this
  }

  react(e) {
    let name = e.target.name;
    let opts = [ ...e.target.selectedOptions ].map(x => x.value)
    let change = this.model.set(name, opts)
    change && this.fetch()
  }


  fetch() {

    return fetch('/futurama', {

      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(this.model.json)

    }).then(x => x.json())
      .then(x => this.list = x)
      .then(this.render)
  }

}





