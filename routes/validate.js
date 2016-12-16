'use strict';

const is = require('is')
const { filter } = require('Util/object')
const FIELDS = {
  name       : is.str,
  title      : is.str,
  slug       : is.str,
  gender     : is.str,
  species    : is.str,
  status     : is.str,
  age        : is.str,
  job        : is.str,
  planet     : is.str,
  relatives  : is.str,
  voice      : is.str,
  desc       : is.str,
  image      : is.str,
  quotes     : is.arr,
  appearance : is.arr,
  categories : is.arr,
}

module.exports = x => filter(x, (v, k) => k in FIELDS && FIELDS[k](v))