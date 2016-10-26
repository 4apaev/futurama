'use strict';
global.log = console.log.bind(console)

const cwd = process.cwd()
const is = require('is')
const fs = require('fs')
const http = require('http')
const fetch = require(cwd + '/task/fetch')
const Mongo = require('mongodb').MongoClient;


const fin = err => log(err||'DONE')
const getImg = (slug, url) => `${ cwd }/images/${ slug }.${ url.match(/\.(gif|jpe?g|png)/i)[1].toLowerCase() }`


function queue(docs, done, i=0, n=docs.length) {
    function next(err) {
      if (err||i>=n)
        return done(err);

      let { slug, image } = docs[i++];
      let name = getImg(slug, image);
      fetch(image, name, next)
    }
    next()
  }



Mongo.connect('mongodb://localhost:27017/futurama')
     .then(db => {
        db.collection('characters')
          .find({ image: { $regex: /^http/i }})
          .toArray()
          .then(docs => {
              queue(docs, fin);
              db.close();
          })
            .catch(fin);
    })

