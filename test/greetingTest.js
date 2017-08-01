/* @flow */
import test from 'ava'
import greeting from 'find-nearest-package-json'

test('is the correct string', t => {
  t.is(greeting, 'Hello World!')
})
