const is       = require('is');
const declare  = require('declare');

module.exports = {
  is, declare, init
}

function init(root, app) {

  root.is = app.is
  root.declare = app.declare

}