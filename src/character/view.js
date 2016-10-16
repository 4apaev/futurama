const Model = require('./model');
const template = require('./template');
const sync = require('../sync');

module.exports = class Character {

  constructor(el) {
      this.el = el
      this.el.on('change .col > input', this.react, this)
      this.el.on('change nav > input',  this.add, this)
      this.el.on('click  nav > button', this.drop, this)
      this.el.on('click  button.close', this.close, this)

      this.model = new Model
      this.model.on('change:_id', this.render, this)

      let match = location.hash.match(/characters\/(\w+)/)
      match && this.fetch(match[1])
    }

    fetch(id) {
        return sync.find(id).then(x => this.model.set(x.result))
      }

    render() {
        this.el.classList.remove('hidden')
        this.el.html = template(this.model.json)
        return this
      }

    add(e) {
      let  { name, value, parent } = e.target
      let i = this.model.get(name).push(value)
      parent.append(`<button value="${ name }-${ i-1 }">✖︎ ${ value }</button>`)
      return false
    }

    drop(e) {
      let [ name, i ] = e.target.value.split('-')
      this.model.get(name).splice(+i, 1)
      e.target.remove()
      return false
    }

    react(e) {
      this.model.set(e.target.name, e.target.value)
      return false
    }

    close() {
      this.el.classList.add('hidden')
      return false
    }

}


