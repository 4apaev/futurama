const is = require('is');

const field = (key, value='', type='text') => `
<label for="${ key }">${ key }</label>
<input name="${ key }" value="${ value }" placeholder="${ key }" type="${ type }">`


const list = (name, arr=[]) => `
<h3>${ name }</h3>
<nav>
  <input name="${ name }" placeholder="✚ add ${ name }" type="text">
  ${ arr.map((x, i) => `<button value="${ name }-${ i }">✖︎ ${ x }</button>`).join('') }
</nav>`

module.exports = ({ name, desc, gender, species, status, age, planet, job, voice, appearance=[], quotes=[], categories=[] }) => `

<div class="col">
  <div class="btn-group">
    <button class="btn close">✖</button>
    <button class="btn save">save</button>
  </div>
  <input name="name" value="${ name }" placeholder="name" type="text">
  <textarea name="desc">${ desc }</textarea>
</div>

<div class="col">
  ${ field('gender'     ,gender) }
  ${ field('species'    ,species) }
  ${ field('status'     ,status) }
  ${ field('age'        ,age) }
  ${ field('planet'     ,planet) }
  ${ field('job'        ,job) }
  ${ field('voice'      ,voice) }
</div>

<div class="col">
  ${ list('categories', categories) }
  ${ list('appearance', [].concat(appearance)) }
  ${ list('quotes', quotes.map(x => x.quote||x)) }
</div>`