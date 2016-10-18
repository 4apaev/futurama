const Query = require('./query/view');
const Navbar = require('./navbar/view');
const List = require('./list/view');
const Character = require('./character/view');
const sync = require('./sync');

module.exports = class View {
  constructor(el) {
      this.el = el

      this.list = new List(el.find('#list'))
      this.query = new Query(el.find('#query'))
      this.navbar = new Navbar(el.find('#navbar'))
      this.character = new Character(el.find('#character'))

      this.query.model.on('change', this.fetch, this)
      this.navbar.model.on('change', this.fetch, this)

      this.list.el.on('click a', this.show, this);
      this.fetch()
    }

   show(e) {
    let id = e.target.href.split('/').pop();
    let char = this.list.find(id)
    this.character.model.set(char)
  }

  fetch() {
      return sync.query(this.query.model.json).then(x => {
        let silent = true
        let { result, total } = x
        this.navbar.model.set('total', total, silent)
        this.list.render(this.list.collection = result)
      });
    }
}