/* @flow */
import * as fs from 'fs'
import * as path from 'path'

type PackageJson = { [string]: string | number | boolean }

export async function findNearestPackageJson(
  directoryPath: string = path.resolve()
): Promise<{ path: string, data: PackageJson }> {
  try {
    const packageJsonPath = path.join(directoryPath, 'package.json')
    const packageJsonData = JSON.parse(await readFile(packageJsonPath))
    return {
      path: packageJsonPath,
      data: packageJsonData
    }
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
): { path: string, data: PackageJson } {
  try {
    const packageJsonPath = path.join(directoryPath, 'package.json')
    const packageJsonData = JSON.parse(readFileSync(packageJsonPath))
    return {
      path: packageJsonPath,
      data: packageJsonData
    }
  } catch (error) {
    return findNearestPackageJsonSync(path.dirname(directoryPath))
  }
}

function readFileSync(filePath: string): string {
  return fs.readFileSync(filePath, 'utf8')
}
