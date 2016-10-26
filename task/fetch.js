'use strict';

const fs = require('fs')
const http = require('http')

module.exports = function fetch(url, name, cb) {
  let file = fs.createWriteStream(name);
  let req = http.get(url, res => res.pipe(file));
  req.on('error', cb)
  file.on('finish', cb)
}




