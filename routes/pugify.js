'use strict';
const is = require('is');
const pug = require('pug');
const { keys, assign, create } = Object;

module.exports = pugify;
  
function pugify(req, res) {
    const file = `./${req.url.match(/\w+/g).join('/')}.pug`;
    const locals = assign({ is, keys, create, assign }, req.body);
    const html = pug.renderFile(file, locals);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', html.length);
    res.end(html);
  }

