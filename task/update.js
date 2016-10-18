'use strict';

global.log = console.log.bind(console)

const is = require('is');
const Mongo = require('mongodb').MongoClient;



const updateImg = (col) => {
  col.find({ image: { $exists: false }}).forEach(doc => {
    col.updateOne({ _id: doc._id }, { $set: { image: '' } })
  })
}

const updateAppearance = (col) => {
  col.find().forEach(doc => {
    col.updateOne({ _id: doc._id }, { $set: { appearance: [ doc.appearance ] } })
  })
}

Mongo.connect('mongodb://localhost:27017/futurama')
    .then(db => {

        updateImg(db.collection('characters'))
        setTimeout(() => db.close(), 2000)
    })
