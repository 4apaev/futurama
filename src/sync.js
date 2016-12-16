const is = require('is')
const Qs = require('Util/string/qs')
const json = x => x.json()
const fail = ({ message, stack }) => log([ 'ERROR', message, stack ].join('\n'))

exports.find = id => fetch('/characters/' + id).then(json).catch(fail);
exports.list = body => fetch('/list?' + Qs.encode(body)).then(json).catch(fail)

exports.update = (id, diff) => is.empty(diff)
  ? Promise.resolve({ message: 'nothing to update' })
  : fetch('/characters/' + id, {
      body: JSON.stringify({ diff }),
      method:'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(json).catch(fail);




// const Store = require('Util/fs/store')
// const store = new Store('futurama')