// 根据路径引用相关文件
import { resolve } from 'path';
import { existsSync, readJsonSync } from 'fs-extra'

// wcli package。json
const packageJson = readJsonSync(resolve(__dirname, '../../../package.json'))
// 当前执行命令所在目录
const currentBinPath: string = process.cwd()

// 执行命令项目文件获取路径方法
const getCurrentBinFilePath = (...path: string[]): string => resolve(currentBinPath, ...path)

// 执行命令项目的wcliconfig.json路径
const currentWcliConfigPath = getCurrentBinFilePath('./wcliconfig.json')
// 执行命令项目的packagejson路径
const currentPackageJsonPath = getCurrentBinFilePath('./package.json')

// 执行命令项目wcliconfig.json

// eslint-disable-next-line
const currentWcliConfig = existsSync(currentWcliConfigPath) ? require(currentWcliConfigPath) : null
// 执行命令项目packeage.json
// eslint-disable-next-line
const currentPackageJson = existsSync(currentPackageJsonPath) ? require(currentWcliConfigPath) : {}

export {
  currentBinPath,
  currentWcliConfig,
  currentPackageJson,
  packageJson,
  getCurrentBinFilePath
}