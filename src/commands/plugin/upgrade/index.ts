
import * as fse from "fs-extra";
import { getPluginPathWithPluginName } from "@utils/getPluginFile";
import throwHandleError from "@utils/errorHandler/error";
import { getPluginCacheByName } from "@commands/plugin/utils/pluginCacheUtils";
import pluginInstall from "@commands/plugin/install";


// todo 目前暂时是通过删除重新拉取来更新插件 后续需要判断是否需要更新
const pluginUpgrade = (pluginName: string, isClone?: boolean) => {
  const pluginPath = getPluginPathWithPluginName(pluginName)
  // 先查找当前plugin目下下是否有相应的插件目录
  if (!pluginPath) {
    throwHandleError(`wcli plugins目录下不存在${pluginName.bold}插件`)
  }
  fse.removeSync(pluginPath)
  // 获取插件缓存
  const { isNpm, pluginPath: downloadPluginPath } = getPluginCacheByName(pluginName)
  return pluginInstall(isNpm ? pluginName : downloadPluginPath, isNpm)
}

export default pluginUpgrade
