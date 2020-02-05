import {resolve} from 'path'
import {existsSync} from 'fs'
import { WCliConfigJson } from "../../types/configJsonType";
import throwHandleError from '../errorHandler/error';
import { getCurrentBinFilePath } from '../filePath';

export function getPluginFileWithLocalWcliPath(wcliConfigJson: WCliConfigJson):string {
  const {plugin} = wcliConfigJson
  const localProjectPluginPath: string = resolve(__dirname, '../../plugins', plugin)
  console.log(localProjectPluginPath)
  if(existsSync(localProjectPluginPath)){
    // 本地wcli plugins目录中找到了相对应的plugin目录 返回当前路径
    return localProjectPluginPath
  }
}

// 执行命令行的node_modules下查找是否有plugins
export function getPluginFileWithBinPath(wcliConfigJson: WCliConfigJson): string {
  const {plugin} = wcliConfigJson
  const binProjectPluginPath: string = getCurrentBinFilePath('node_modules',plugin)
  if(existsSync(binProjectPluginPath)){
    // 行命令行的node_modules下查找到plugin
    return binProjectPluginPath
  }
}
// 根据插件名称获取相应的文件
export function getPluginFileByName(wcliConfigJson: WCliConfigJson, filePath: string) {
  const {plugin} = wcliConfigJson
  let pluginPath:string = ''
  // 先从本地wcliplugin文件plugin下查找
  if(getPluginFileWithLocalWcliPath(wcliConfigJson)){
    pluginPath = getPluginFileWithLocalWcliPath(wcliConfigJson)
  }else if(getPluginFileWithBinPath(wcliConfigJson)){
      // 从命令行node——modules文件plugin下查找
      pluginPath = getPluginFileWithBinPath(wcliConfigJson)
  }else {
    // 都找不到 提醒装插件
    throwHandleError(`请检查插件：${plugin.bgWhite}是否已安装，未安装可使用"${'wcli install plugin [plugin]'.bgWhite}命令进行安装`)
  }
  const pluginFilePath = resolve(pluginPath, filePath)
  console.log(pluginFilePath)
}
