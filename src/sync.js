
const json = x => x.json()
exports.query = body => fetch('/characters', {
    body: JSON.stringify(body, 0, 2),
    method:'POST',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  })
  .then(json);

exports.find = id => fetch('/characters/' + id).then(json);



