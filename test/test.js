'use strict'

const test = require('ava')
const plugin = require('../lib/index')
const { readFileSync, writeFileSync } = require('fs')
const path = require('path')
const posthtml = require('posthtml')
const fixtures = path.join(__dirname, 'fixtures')

test('basic', (t) => {
  return compare(t, 'basic')
})
test('code', (t) => {
  return compare(t, 'code')
})
test('change tag', (t) => {
  return compare(t, 'change-tag')
})

function compare (t, name) {
  const html = readFileSync(path.join(fixtures, `${name}.html`), 'utf8')
  const expected = readFileSync(path.join(fixtures, `${name}.expected.html`), 'utf8')

  return posthtml([plugin()])
    .process(html)
    .then((res) => {
      writeFileSync(path.join(__dirname, `/output/${name}.expected.html`), res.html, () => true)
      return t.truthy(res.html === expected)
    })
}
