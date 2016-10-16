var Egg = require('../src/Egg')
var Vent = require('vent')
var assert = require('assert')

describe('Egg', () => {
  var egg = new Egg
  it('should be instance of Egg and Vent', () => {
    assert.equal(egg instanceof Egg, true)
    assert.equal(egg instanceof Vent, true)
  })
})


describe('Egg:set', function() {
  var egg = new Egg;
  it('should set key val', () => assert.equal(egg.set('a', 1).get('a'), 1))
  it('should set object', () => assert.equal(egg.set({ b: 2 }).get('b'), 2))
})


describe('Egg:change', function() {
  let egg = new Egg, change = 0, a = 0, b = 0;

  egg.on('change', model => {
    change +=1
  }).on('change:a', model => {
    a +=1
  }).on('change:b', model => {
    b +=1
  })


  it('should emit change events', () => {
    egg.set({ a: 'A', b: 'B' })
    assert.equal(change, 1)
    assert.equal(a, 1)
    assert.equal(b, 1)
  })

  it('should emit change events', () => {
    egg.set('a', 'aa')
    assert.equal(change, 2)
    assert.equal(a, 2)
    assert.equal(b, 1)
  })

  it('should not emit change events', () => {
    egg.set('a', 'aa')
    assert.equal(change, 2)
    assert.equal(a, 2)
    assert.equal(b, 1)
  })

})
