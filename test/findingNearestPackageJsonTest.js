/* @flow */
import test from 'ava'
import * as path from 'path'
import {
  findNearestPackageJson,
  findNearestPackageJsonSync
} from 'find-nearest-package-json'

test('finding the nearest package.json relative to the current working directory', async t => {
  const {
    path: packageJsonPath,
    data: packageJson
  } = await findNearestPackageJson()
  t.is(packageJsonPath, path.resolve('package.json'))
  t.is(packageJson.name, 'find-nearest-package-json')
})

test('finding the nearest package.json relative to a given directory', async t => {
  const {
    path: packageJsonPath,
    data: packageJson
  } = await findNearestPackageJson(path.resolve('test/fixtures/project'))
  t.is(packageJsonPath, path.resolve('test/fixtures/project/package.json'))
  t.is(packageJson.name, 'project')
})

test('recursively finding the nearest package.json in a parent directory of the given directory', async t => {
  const {
    path: packageJsonPath,
    data: packageJson
  } = await findNearestPackageJson(
    path.resolve('test/fixtures/project/directory')
  )
  t.is(packageJsonPath, path.resolve('test/fixtures/project/package.json'))
  t.is(packageJson.name, 'project')
})

test('recursively finding the nearest package.json in an ancestor directory of the given directory', async t => {
  const {
    path: packageJsonPath,
    data: packageJson
  } = await findNearestPackageJson(
    path.resolve('test/fixtures/project/directory/subdirectory')
  )
  t.is(packageJsonPath, path.resolve('test/fixtures/project/package.json'))
  t.is(packageJson.name, 'project')
})

test('throwing an exception if a package.json cannot be found', async t => {
  await t.throws(findNearestPackageJson(path.resolve('..')))
})

test('synchronously and recursively finding the nearest package.json in an ancestor directory of the given directory', t => {
  const {
    path: packageJsonPath,
    data: packageJson
  } = findNearestPackageJsonSync(
    path.resolve('test/fixtures/project/directory/subdirectory')
  )
  t.is(packageJsonPath, path.resolve('test/fixtures/project/package.json'))
  t.is(packageJson.name, 'project')
})

test('synchronously throwing an exception if a package.json cannot be found', t => {
  t.throws(() => findNearestPackageJsonSync(path.resolve('..')))
})
