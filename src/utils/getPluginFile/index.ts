import { resolve } from 'path'
import { existsSync } from 'fs'
import { WCliConfigJson } from '../../types/configJsonType';
import throwHandleError from '../errorHandler/error';
import { getCurrentBinFilePath } from '../filePath';
import { isArray } from '../checktype';
import autoPackageJsonInstall from '../autoPackageJsonInstall';

// 获取文件名字
const getFileNameByRegx = (filePath: string): string => {
  const fileNameArray: string[] | null = /(^|\/)[^/]+\.(json|js|ts|txt|md|css|html)$/.exec(filePath)
  return isArray(fileNameArray) ? fileNameArray[0].replace('/', '') : filePath
}
export function getPluginFileWithLocalWcliPath(wcliConfigJson: WCliConfigJson): string {
  const { plugin, package: installPackageType = 'npm' } = wcliConfigJson
  const localProjectPluginPath: string = resolve(__dirname, '../../../plugins', plugin)
  if (existsSync(localProjectPluginPath)) {
    // 查找到插件目录了 检查当前插件目录是否有package.json 有的话检查是否有node_modules目录 没有的话帮忙install
    autoPackageJsonInstall(localProjectPluginPath, installPackageType)
  }
  return existsSync(localProjectPluginPath) ? localProjectPluginPath : null
}

// 执行命令行的node_modules下查找是否有plugins
export function getPluginFileWithBinPath(wcliConfigJson: WCliConfigJson): string {
  const { plugin } = wcliConfigJson
  const binProjectPluginPath: string = getCurrentBinFilePath('node_modules', plugin)
  return existsSync(binProjectPluginPath) ? binProjectPluginPath : null
}
// 根据插件名称获取相应的文件
export function getPluginFileByName(wcliConfigJson: WCliConfigJson, filePath: string, fileName?: string): any {
  const execFileName = fileName || getFileNameByRegx(filePath)
  const { plugin } = wcliConfigJson
  let pluginPath = ''
  // 先从本地wcliplugin文件plugin下查找
  if (getPluginFileWithLocalWcliPath(wcliConfigJson)) {
    pluginPath = getPluginFileWithLocalWcliPath(wcliConfigJson)
  } else if (getPluginFileWithBinPath(wcliConfigJson)) {
    // 从命令行node——modules文件plugin下查找
    pluginPath = getPluginFileWithBinPath(wcliConfigJson)
  } else {
    // 都找不到 提醒装插件
    throwHandleError(`请检查插件：${plugin.bold}是否已安装，未安装可使用"${'wcli install plugin [plugin]'.bold}命令进行安装`)
  }
  const pluginFilePath = resolve(pluginPath, filePath)
  if (!existsSync(pluginFilePath)) {
    // 对应的文件不存在
    throwHandleError(`插件：${plugin.bold}已安装，但是插件目录下缺少相应的${execFileName.bold}文件`)
  }
  return import(pluginFilePath)
}
