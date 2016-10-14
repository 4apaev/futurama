const is = require('is');
const { map, create } = require('Util/object');

module.exports = class Model {
  constructor(limit, skip) {
      this.skip = skip
      this.limit = limit
      this.query = create(null)
    }

  get(k) {
      return this.query[k]
    }

  set(k, v) {
    if (is.not.empty(v)) {
      this.query[k] = v
      return true;
    }
    return k in this.query && (delete this.query[k]);
  }

  get json() {
    let { query, skip, limit } = this
    return { skip, limit, query: map(query, (v, k) => ({ $in: v })) }
  }

}
