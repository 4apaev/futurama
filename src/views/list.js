module.exports = class List {
  constructor(el) {
      this.el = el
      this.ids = []
      this.collection = []
    }

    template({ _id, name }) {
        return `<a href="#characters/${ _id }">${ name }</a>`
      }

    render() {
        this.el.html = this.collection.map(this.template).join('')
        return this
      }

    find(_id) {
      let i = this.ids.indexOf(_id);
      let char = this.collection[i] || { _id }
      let next = this.ids[i+1]
      let prev = this.ids[i-1]
      return [ prev, char, next ]
    }

    resolve(arr) {
      this.ids = arr.map(x => x._id)
      this.collection = arr
      return this;
    }
}

