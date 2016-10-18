'use strict';

global.log = console.log.bind(console)

const dir = x => `${ __dirname }/${ x }`

const fs = require('fs')
const unzip = require(dir('unzip'))
const parse = require(dir('parse'))
const fetch = require(dir('fetch'))

const paths = {
  url: 'http://s3.amazonaws.com/wikia_xml_dumps/f/fu/futurama_pages_current.xml.7z',
  xml:  dir('current.xml'),
  zip:  dir('current.xml.7z'),
  json: dir('current.json'),
}

log('download from:', paths.url)

fetch(paths.url, paths.zip, () => {

  log('unzip to:', paths.zip)

  unzip(paths.zip).then(() => {

    log('parse from:', paths.xml)

    let xml = fs.readFileSync(paths.xml)
    let pages = parse(xml)

    log('save to:', paths.json)
    fs.writeFileSync(paths.json, JSON.stringify(pages, 0, 2))

  }).catch(log)
})
