/* @flow */
import * as fs from 'fs'
import * as path from 'path'

type PackageJson = { [string]: string | number | boolean }

export async function findNearestPackageJson(
  directoryPath: string = path.resolve()
): Promise<PackageJson> {
  try {
    const contents = await readFile(path.join(directoryPath, 'package.json'))
    return JSON.parse(contents)
  } catch (error) {
    return findNearestPackageJson(path.dirname(directoryPath))
  }
}

function readFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, result) => {
      if (error) reject(error)
      else resolve(result)
    })
  })
}

export function findNearestPackageJsonSync(
  directoryPath: string = path.resolve()
): PackageJson {
  try {
    const contents = readFileSync(path.join(directoryPath, 'package.json'))
    return JSON.parse(contents)
  } catch (error) {
    return findNearestPackageJsonSync(path.dirname(directoryPath))
  }
}

function readFileSync(filePath: string): string {
  return fs.readFileSync(filePath, 'utf8')
}
