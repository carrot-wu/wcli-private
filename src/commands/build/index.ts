// 打包模式命令
import { WCliConfigJson } from '@srcTypes/configJsonType'
import { currentWcliConfig } from '@utils/file'
import throwHandleError from '@utils/errorHandler/error'
import { formatWCliConfigJson } from '@utils/format'
import { getPluginFileByName } from '@utils/getPluginFile'
import { isFunction } from '@utils/checktype'
import { createBuildContext } from '@utils/createContext'

interface Options {
  debug?: boolean;
}

const BUILD_FILE = 'build.js'

const buildCommand = async (options: Options) => {
  const debug: boolean = options.debug || false
  // 获取当前目录下的配置文件wcliconfig.json
  if (!currentWcliConfig) {
    throwHandleError('当前目录缺少wcliconfig.json文件')
  }
  // 获取配置
  const wcliConfigJson: WCliConfigJson = formatWCliConfigJson(currentWcliConfig)

  // 获取插件的publish.js文件
  const devFile = getPluginFileByName(wcliConfigJson, BUILD_FILE)

  if (!isFunction(devFile)) {
    throwHandleError(`${BUILD_FILE} is not the function`)
  }
  // 把一些通用上下文参数和方法注入打包文件中
  return devFile(createBuildContext({ wcliConfigJson, debug }))
}

export default buildCommand
