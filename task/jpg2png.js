'use strict';
global.log = console.log.bind(console)

const img2png = require('Util/misc/img2png')

const cwd = process.cwd()
const dir = `${cwd}/images`

const convert = (buf, x) => {
  let match = x.match(/(.+?)\.(jpe?g|gif)$/i)
  if (match) {
    let [ name, ext ] = match;
    let src = `${dir}/${x}`
    let trg = `${dir}/${name}.png`
    buf.push(img2png(src, trg));
  }
  return buf;
}


let images = fs.readdirSync(dir)
let deffered = images.reduce(convert, [])

Promise.all(deffered
              .then(() => {
                log('DONE')
              })
              .catch(err => {
                log('ERROR');
                log(err);
              });