require('dom');

const is = require('is');
const declare = require('declare');
const View = require('./View');

module.exports = { is, declare, init }

function init(root, app) {
  root.is = app.is
  root.declare = app.declare
  app.view = new View(document.body)
}
