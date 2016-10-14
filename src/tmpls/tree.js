const is = require('is');

module.exports = tree;

function tree(x, k, path=[], buf=[], needDT) {

    let type = is(x).toLowerCase()
    let name = path.join('.')

    if (is.obj(x)) {
      buf.push(`<dl class="${type}" name="${name}"><button class="toggle">${k}</button><section>`);

      if('array'===type)
        for (let i = 0; i < x.length; i++)
          tree(x[i], i, path.concat(i), buf);
      else
        for (let k in x)
          tree(x[k], k, path.concat(k), buf, true);

      buf.push(' </section></dl>');
    } else if (is.def(x)) {

      needDT && buf.push(`<dt class="${type}" name="${name}">${k}</dt>`)
      buf.push(`<dd class="${type}" name="${name}">${x}</dd>`)

    }
    return buf.join('')
  }