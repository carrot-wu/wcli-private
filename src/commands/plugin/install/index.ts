import { downloadPluginByGit } from '../utils';
import throwHandleError from '../../../utils/errorHandler/error';

const pluginInstall = (pluginNpmNameOrPath: string, isNpm = false) => {
  if (isNpm) {
    // 使用npm包的形式下载插件
    throwHandleError('使用npm包下载插件正在开发中，请耐心等候')
  } else {
    // 使用git的形式下载插件
    return downloadPluginByGit(pluginNpmNameOrPath)
  }
}

export default pluginInstall
