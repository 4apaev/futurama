'use strict';

const fs = require('fs')
const dir = `${ process.cwd() }/css/SVG/`
const json = `${ process.cwd() }/css/icons.json`


let svgs = fs.readdirSync(dir).reduce((buf, x) => {

  let name = x.slice(0, -4)
  let [ , value ] = fs.readFileSync(dir + x).toString().match(/path d\="(.*)"/)||[]

  buf[name] = value
  return buf;
}, {})

fs.writeFileSync(json, JSON.stringify(svgs, 0, 2))



