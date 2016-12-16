const field = (name, value='') => `
  <label class="field" for="${ name }">
    <b class="i-${ name }">${ name }</b>
    <input name="${ name }" value="${ value }" placeholder="${ name }" type="text">
  </label>`


const list = (name, arr=[], checked) => `<div class="btn-option">
  <input  id="opt-${ name }" class="opt-toggle" name="toggle" type="checkbox"${ checked ? ' checked' : ''}>
  <label for="opt-${ name }" class="opt-title">${ name }</label>
  <nav class="opt-tab">
    <input name="${ name }" placeholder="✚ add ${ name }" type="text">
    ${ arr.map((x, i) => `<button class="i-close" value="${ name }">${ x }</button>`).join('') }
  </nav>
</div>`

module.exports = (prev, { name, image, desc, gender, species, status, age, planet, job, voice, appearance, quotes, categories }, next) => {

  let head = [ '<a class="btn i-close" href="#characters"></a><button class="btn i-save"></button>' ]
  prev && head.push(`<a class="btn i-prev" href="#characters/${ prev }"></a>`)
  next && head.push(`<a class="btn i-next" href="#characters/${ next }"></a>`)

  return `
<div class="col">
  <div class="btn-group actions">${ head.join('') }</div>
  <div class="head fx-row"><img src="/images/${ image }"><h2>${ name }</h2></div>
  ${ field('gender'     ,gender) }
  ${ field('species'    ,species) }
  ${ field('status'     ,status) }
  ${ field('planet'     ,planet) }
  ${ field('job'        ,job) }
  ${ field('voice'      ,voice) }
  ${ list('appearance'  ,appearance, 1) }
  ${ list('categories'  ,categories, 1) }
  ${ list('quotes'      ,quotes, 1) }
</div>
<div class="col fx"><textarea name="desc">${ desc }</textarea></div>`
}