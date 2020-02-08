import { resolve } from 'path'
import { existsSync } from 'fs'
import { execSync } from 'child_process'
import { InstallType } from '../../types/installType';
import { loading, success } from '../log';


/**
 * 检查path目录下是否有node_Modules和package.json
 * 没有的话帮忙install
 * @param {string} path
 * @param {InstallType} installType
 */
export default function autoPackageJsonInstall(path: string, installType: InstallType): void {
  const nodeModulesPath = resolve(path, 'node_modules')
  const packageJsonPath = resolve(path, 'package.json')
  // 存在package 不存在node_modules
  if (existsSync(packageJsonPath) && !existsSync(nodeModulesPath)) {
    loading('plugin is auto installing...')
    execSync(`${installType} install`)
    success(`${installType} install success!`)
  }
}
