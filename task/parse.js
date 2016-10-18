'use strict';

global.log = console.log.bind(console)


const rgx = {
  page: /\<page\>[\s\S]+?\<\/page\>/g,
  title: /\<title\>(.+?)<\/title\>/,
  text: /\<text.+?\>([\s\S]+?)\<\/text\>/,
  ns: /\<ns\>0\<\/ns\>/
}

module.exports = data => {
  let match = data.toString().match(rgx.page)||[];

  return  match.reduce((buf, page) => {

    if (rgx.ns.test(page)) {
      let [ , title ] = page.match(rgx.title)||[];
      let [ , text ] = page.match(rgx.text)||[];
      buf.push({ title, text });
    }

    return buf
  }, [])

}


