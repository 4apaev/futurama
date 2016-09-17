'use strict';

const is = require('is');
const declare = require('declare');

is.use('el', x => x instanceof Element);
is.use('node', x => x instanceof Node);

declare.alias(Node.prototype,    'textContent',            'text');
declare.alias(Node.prototype,    'parentElement',          'parent');
declare.alias(Element.prototype, 'querySelector',          'find');
declare.alias(Element.prototype, 'querySelectorAll',       'query');
declare.alias(Element.prototype, 'nextElementSibling',     'next');
declare.alias(Element.prototype, 'previousElementSibling', 'prev');
declare.alias(Element.prototype, 'lastElementChild',       'last');
declare.alias(Element.prototype, 'firstElementChild',      'first');
declare.alias(Element.prototype, 'clientWidth',            'width');
declare.alias(Element.prototype, 'clientHeight',           'height');

declare.method(Element.prototype, 'on', function on(...args) {
    this.addEventListener(...args)
    return this
  });

declare.method(Element.prototype, 'off', function on(...args) {
    this.removeEventListener(...args)
    return this
  });

declare.method(Element.prototype, 'empty', function empty(first) {
    while(first=this.firstChild)
      this.removeChild(first);
    return this
  });

declare.method(Element.prototype, 'insert', function insert(x, p='beforeEnd') {
    return this[`insertAdjacent${1==x.nodeType ? 'Element': 'HTML' }`](p, x)
  });

declare.method(Element.prototype, 'append', function append(x) {
    return this.insert(x, 'beforeEnd')
  });

declare.method(Element.prototype, 'prepend', function prepend(x) {
    return this.insert(x, 'afterBegin')
  });

declare.method(Element.prototype, 'after', function after(x) {
    return this.insert(x, 'afterEnd')
  });

declare.method(Element.prototype, 'before', function before(x) {
    return this.insert(x, 'beforeBegin')
  });

declare.accessor(Element.prototype, 'html', function() {
    return this.innerHTML
  }, function(html) {
      return this.empty().append(html)
    });


'forEach:each,map,reduce,filter'.split(',').forEach(x => {
  let [ method, name=method ] = x.split(':');
  declare.alias(Array.prototype, method, name, NodeList.prototype);
  declare.alias(Array.prototype, method, name, HTMLCollection.prototype);
});
