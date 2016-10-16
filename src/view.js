const Query = require('./query/view');
const Navbar = require('./navbar/view');
const List = require('./list/view');
const Character = require('./character/view');
const sync = require('./sync');

module.exports = class View {
  constructor(el) {
      this.el = el
      this.set('query', Query).set('navbar', Navbar);

      this.list = new List(this.el.find('#list'))
      this.character = new Character(this.el.find('#character'))

      this.list.el.on('click a', this.show, this);
      this.fetch()
    }

   show(e) {
    let id = e.target.href.split('/').pop();
    let char = this.list.find(id)
    this.character.model.set(char)
  }

  fetch() {
      return sync.query({
        skip:  this.navbar.model.get('skip'),
        limit: this.navbar.model.get('limit'),
        query: this.query.model.json
      })
        .then(x => this.list.render(this.list.collection = x));
    }

  set(name, Ctor) {
      this[name] = new Ctor(this.el.find('#' + name))
      this[name].model.on('change', this.fetch, this)
      return this
    }
}