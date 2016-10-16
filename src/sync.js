
const json = x => x.json()
const parse = x => x.result

exports.query = body => fetch('/characters', {
    body: JSON.stringify(body, 0, 2),
    method:'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  })
  .then(json)
  .then(parse)

exports.find = id => fetch('/characters/' + id).then(json)



