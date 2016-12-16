'use strict';

const fs = require('fs')
const https = require('https')

const log = console.log.bind(console)
const cwd = process.cwd()


// Being an 'instance of', P31 : https://www.wikidata.org/wiki/Property:P31
// https://www.wikidata.org/wiki/Q73622

const url = 'https://query.wikidata.org/bigdata/namespace/wdq/sparql?format=json&query=' + encodeURIComponent(`#added before 2016-10
SELECT ?season ?episode ?episodeLabel
WHERE {
  BIND(wd:Q73622 as ?show) .
  ?season wdt:P361 ?show .
  ?episode wdt:P361 ?season .
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" .
}}`)


let json = fs.createWriteStream(`${ cwd }/wikidata.json`);
let req = https.get(url, res => res.pipe(json))

// let req = https.get(url, res => res.pipe(json))


req.on('error', e => log('FAIL\n', e.message));
json.on('finish', e => log('DONE'));
