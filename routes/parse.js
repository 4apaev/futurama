'use strict';

const is = require('is')
const Url = require('url')
const Qs = require('querystring')
const reduce = require('Util/object/reduce');
const isOpt = k => k==='skip'||k==='limit'

function build(buf, v, k) {
  if (isOpt(k))
    buf[ k ] = +v
  else
    buf.query[ k ] = is.arr(v) ? { $in: v } : v
  return buf
}

module.exports = (url, limit=50) => {
  let body = Qs.decode(Url.parse(url).query);
  return reduce(body, build, { limit, skip: 0, query: {} });
}