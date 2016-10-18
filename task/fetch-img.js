'use strict';
global.log = console.log.bind(console)

const cwd = process.cwd()

const fs = require('fs')
const http = require('http')
const fetch = require(cwd + '/task/fetch')


const slug = (ttl, url) => `${ cwd }/img/${ ttl.match(/\w+/g).join('_') }.${ url.split('.').pop() }`

function queue(tasks, done, i=0, n=tasks.length) {

    function next(err) {

      if (err||i>=n)
        return done(err);

      let { title, image } = tasks[i++];
      let name = slug(title, image)

      fetch(image, name, next)
    }
    next()
  }



queue(require(cwd + '/img/db.json'), err => {
  log(err||'DONE')
})

