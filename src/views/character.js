const is = require('is');
const Model = require('../models/character');
const template = require('../templates/character');
const { keys, assign, create } = Object
module.exports = class Character {

  constructor(el, prev, next) {

      assign(this, { el, prev, next, model: new Model })

      this.model.on('change:_id', this.fetch, this)
      this.el.on('change .field input, textarea', this.react, this)
      this.el.on('change nav > input',  this.add, this)
      this.el.on('click  nav > button', this.drop, this)
      this.el.on('click  button.i-save',  this.save, this)
    }

    fetch() {
        return this.model.fetch().then(x => this.render())
      }

    render() {
      this.el.html = template(this.prev, this.model.json, this.next)
      return this
    }

    add(e) {
      let { name, value, parent } = e.target
      if (this.model.add(name, value.trim()))
        parent.append(`<button class="i-close" value="${ name }">${ value.trim() }</button>`)
      e.target.value = '';
      return false
    }

    drop(e) {
      this.model.drop(e.target.value, e.target.text.trim()) && e.target.remove();
      return false
    }

    react(e) {
      let {  name, value } = e.target;
      this.model.set(name, value)
      return false
    }

    save(e) {
      e.target.disabled = true;
      const unlock = x => {
        e.target.disabled = false
        x && log(x)
      }
      this.model.update().then(unlock).catch(unlock);
      return false;
    }
}