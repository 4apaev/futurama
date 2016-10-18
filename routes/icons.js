'use strict';

const pug = require('pug');
const icons = require('../css/icons.json');

module.exports = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(pug.renderFile(`./view/icons.pug`, { icons }));
  }