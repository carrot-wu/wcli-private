// 开发模式命令
import { WCliConfigJson } from "@srcTypes/configJsonType"
import { currentWcliConfig } from "@utils/file"
import throwHandleError from "@utils/errorHandler/error"
import { formatWCliConfigJson } from "@utils/format"
import { getPluginFileByName } from "@utils/getPluginFile"
import { isFunction } from "@utils/checktype"
import { createDevContext } from "@utils/createContext"

interface Options {
  debug?: boolean;
}

const DEV_FILE = "dev.js"

const devCommand = async (options: Options) => {
  const debug: boolean = options.debug || false
  // 获取当前目录下的配置文件wcliconfig.json
  if (!currentWcliConfig) {
    throwHandleError("当前目录缺少wcliconfig.json文件")
  }
  // 获取配置
  const wcliConfigJson: WCliConfigJson = formatWCliConfigJson(currentWcliConfig)

  // 获取插件的publish.js文件
  const devFile = getPluginFileByName(wcliConfigJson, DEV_FILE)

  if (!isFunction(devFile)) {
    throwHandleError(`${DEV_FILE} is not the function`)
  }
  // 把一些通用上下文参数和方法注入
  return devFile(createDevContext({ wcliConfigJson, debug }))
}

export default devCommand
