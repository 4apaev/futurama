const ico = require('./ico')
const symbol = (id, value) => `<symbol id="${ id }" viewBox="0 0 24 24"><path d="${ value }"></path></symbol>`;

var icons = fetch('/css/icons.json')
              .then(x => x.json())
              .then(x => icons = x);


module.exports = el => id => {
  if (id in icons) {
    id in el.children || el.insertAdjacentHTML('beforeEnd', symbol(id, icons[id]));
    return ico(id)
  }
}



// class Ico {
//   constructor(el, icons) {
//     this.el = el
//     this.icons = icons
//   }

//   get(id) {
//     if (id in this.icons) {
//       id in this.el.children || this.el.append(symbol(id, this.icons[id]))
//       return svg(id)
//     }
//   }

//   fetch(url) {
//       return fetch(url).then(x => x.json()).then(x => this.icons = x)
//     }
// }


// fetch(url).then(x => x.json()).then()


