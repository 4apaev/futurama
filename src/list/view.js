module.exports = class List {
  constructor(el) {
      this.el = el
      this.collection = []
    }

    template({ _id, name }) {
        return `<a href="#characters/${ _id }">${ name }</a>`
      }

    render() {
        this.el.html = this.collection.map(this.template).join('')
        return this
      }

    find(id) {
      return this.collection.find(x => x._id===id);
    }
}

