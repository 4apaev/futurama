'use strict';

const pug = require('pug');

module.exports = home;
function home(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(pug.renderFile(`./view/index.pug`, this.locals));
  }