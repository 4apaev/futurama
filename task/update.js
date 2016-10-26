'use strict';

global.log = console.log.bind(console)

const is = require('is');
const Mongo = require('mongodb').MongoClient;

const trim = x => x.trim()

const updateImg = (col) => {
  col.find({ image: { $exists: false }}).forEach(doc => {
    col.updateOne({ _id: doc._id }, { $set: { image: '' } })
  })
}


const updateAppearance = col => {

  col.find().forEach(doc => {
    let { desc, appearance } = doc;
    let match = desc.match(/Appearances\s+(.*)/);

    if (match) {
      let a = needle(/\*(?:\s+)?\#(?:\s+)?\[(.+?)\]/, match[1]);
      let b = new Set(appearance.concat(a).map(trim))
      col.updateOne({ _id: doc._id }, { $set: { appearance: [ ...b ] } })
    }

  })
}



const updateSlug = col => {

  col.find().forEach(doc => {
      let slug = doc.name.match(/\w+/g).join('_').toLowerCase()
      col.updateOne({ _id: doc._id }, { $set: { slug } })
  })
}

Mongo.connect('mongodb://localhost:27017/futurama')
    .then(db => {
        updateSlug(db.collection('characters'))
        setTimeout(() => db.close(), 2000)
    })


function needle(rx, s) {
  let res, buf = [];
  while(res = rx.exec(s)) {
    let [ match, group ] = res;
    buf.push(group);
    s = s.slice(res.index + match.length);
  }
  return buf
}

