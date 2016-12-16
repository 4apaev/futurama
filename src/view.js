const query = require('./models/query');
const List = require('./views/list');
const Query = require('./views/query');
const Navbar = require('./views/navbar');
const Character = require('./views/character');
const sync = require('./sync');

module.exports = class View {
  constructor(el) {
      this.el = el

      query.on('change', this.fetch, this)

      this.list = new List(el.find('#list'))
      this.query = new Query(el.find('#query'), query)
      this.navbar = new Navbar(el.find('#navbar'), query)
      this.character = new Character(el.find('#character'))

      window.onhashchange = e => {
        let [ , id ] = location.hash.split('/');
        if (id)
          this.init(id)
        else
          this.character.el.empty()
      }

      this.fetch().then(() => {
        let match = location.hash.match(/characters\/(\w+)/);
        match && this.init(match[1]);
      })
    }

    init(id) {
      let [ prev, char, next ] = this.list.find(id);

      this.character.next = next;
      this.character.prev = prev;
      this.character.model.set(char)
      return this
    }

    show(e) {
      this.init(e.target.href.split('/').pop())
      return false
    }

  fetch() {
      return sync.list(query.omit('total')).then(x => {
        let silent = true
        let { result, total } = x
        query.set('total', total, silent)
        return this.list.resolve(result).render();
      });
    }
}