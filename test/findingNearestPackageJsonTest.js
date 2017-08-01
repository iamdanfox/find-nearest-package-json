/* @flow */
import test from 'ava'
import * as path from 'path'
import {
  findNearestPackageJson,
  findNearestPackageJsonSync
} from 'find-nearest-package-json'

test('finding the nearest package.json relative to the current working directory', async t => {
  const packageJson = await findNearestPackageJson()
  t.is(packageJson.name, 'find-nearest-package-json')
})

test('finding the nearest package.json relative to a given directory', async t => {
  const packageJson = await findNearestPackageJson(
    path.resolve('test/fixtures/project')
  )
  t.is(packageJson.name, 'project')
})

test('recursively finding the nearest package.json in a parent directory of the given directory', async t => {
  const packageJson = await findNearestPackageJson(
    path.resolve('test/fixtures/project/directory')
  )
  t.is(packageJson.name, 'project')
})

test('recursively finding the nearest package.json in an ancestor directory of the given directory', async t => {
  const packageJson = await findNearestPackageJson(
    path.resolve('test/fixtures/project/directory/subdirectory')
  )
  t.is(packageJson.name, 'project')
})

test('synchronously and recursively finding the nearest package.json in an ancestor directory of the given directory', t => {
  const packageJson = findNearestPackageJsonSync(
    path.resolve('test/fixtures/project/directory/subdirectory')
  )
  t.is(packageJson.name, 'project')
})
