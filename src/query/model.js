const Egg = require('../Egg');
const navbar = require('../navbar/model');

class Que extends Egg {

  get json() {
    let skip = navbar.get('skip')
    let limit = navbar.get('limit')
    let query = this.map((v, k) => ({ '$in': v }))
    return { skip, limit, query }
  }
}

const query = new Que
query.on('change', () => navbar.set('skip', 0, true))
module.exports = query