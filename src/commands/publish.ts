import {WCliConfigJson} from '../types/configJsonType'
import { currentWcliConfig } from '../utils/filePath'
import throwHandleError from '../utils/errorHandler/error'
import { formatWCliConfigJson } from '../utils/format'
import { getPluginFileByName } from '../utils/getPluginFile'

interface Options {
  debug?: boolean;
}

// 发布模式命令
const publishAction = (options: Options) => {
  // 获取当前目录下的配置文件wcliconfig.json
  if(!currentWcliConfig){
    throwHandleError('当前目录缺少wcliconfig.json文件')
  }
  // 获取配置
  let wcliConfigJson:WCliConfigJson = formatWCliConfigJson(currentWcliConfig)

  // 获取插件的publish.js文件
  const publishFilePath = getPluginFileByName(wcliConfigJson, 'publish.js')
  // 检查相对应的plugin插件是否已安装 安装的话返回安装文件的publish.js文件
}

export default publishAction
