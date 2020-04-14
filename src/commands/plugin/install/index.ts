import { downloadPluginByGit, installPluginByNpm } from "../utils";

const pluginInstall = (pluginNpmNameOrPath: string, isNpm = false) => {
  if (isNpm) {
    // 使用npm包的形式下载插件
    return installPluginByNpm(pluginNpmNameOrPath)
  }
  // 使用git的形式下载插件
  return downloadPluginByGit(pluginNpmNameOrPath)
}

export default pluginInstall
