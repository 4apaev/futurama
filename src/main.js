const dom = require('dom');
const is = require('is');
const declare = require('declare');
const View = require('./View');
const sync = require('./sync');

module.exports = {
  is, declare, sync,

  init(root, app) {

      const view = new View(document.body)
      const { list, query, navbar, character } = view

      app.list = list
      app.query = query
      app.navbar = navbar
      app.character = character

      root.find = dom.find
      root.query = dom.query
    }
}

