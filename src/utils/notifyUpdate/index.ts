import * as updateNotifier from "update-notifier"
import {packageJson, wcliPluginCacheJson} from "@utils/file"
import {PluginCacheParams} from "@commands/plugin/types"
import {warn} from "@utils/log";


/**
 * 检查是否需要升级wcli
 */
export function notifyUpdateWcli(): void {
  const wcliUpdate = updateNotifier({
    pkg: packageJson,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 7
  })
  if (wcliUpdate.update) {
    const {
      latest,
      current
    } = wcliUpdate.update
    warn(`当前wcli处于旧版本:${current},最新版本是:${latest}。您可以使用 wcli upgrade命令或者 npm upadte -g wcli来更新到最新版本`)
  }
}

// 检查插件的更新 仅限于使用npm方式安装的插件

export function notifyUpdatePlugin(pluginCacheParams: PluginCacheParams): void {
  const { pluginName, version } = pluginCacheParams
  const pluginUpdate = updateNotifier({
    pkg: {
      name: pluginName,
      version
    },
    updateCheckInterval: 1000 * 60 * 60 * 24 * 7
  })
  if (pluginUpdate.update) {
    const {
      latest,
      current
    } = pluginUpdate.update
    warn(`当前插件-${pluginName}处于旧版本:${current},最新版本是:${latest}。您可以使用wcli plugin upgrade ${pluginName}来更新到最新版本`)
  }
}


export default function notifyUpdate(): void {
  notifyUpdateWcli()
  // 没有插件 直接退出
  if(!wcliPluginCacheJson) return

  // 获取通过npm形式安装的插件
  const npmPluginCacheArray = Object.values(wcliPluginCacheJson).filter(plugin => plugin.pluginType === 'npm')
  // 循环监听
  npmPluginCacheArray.forEach(pluginCacheParam => notifyUpdatePlugin(pluginCacheParam))
}
