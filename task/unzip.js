'use strict';

// 7z e futurama.xml.7z
const Zip = require('node-7z')

module.exports = (src, dest=__dirname) => {
  let zip = new Zip
  return zip.extractFull(src, dest)
}


  // .then(x => {
  //     log('EXTRACTING DONE', x)
  //   })
  //   .catch(x => {
  //     log('FAIL', x)
  //   });



