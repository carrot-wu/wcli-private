import * as fse from "fs-extra";
import { exec } from "child_process";
import { promisify } from "util";
import { getPluginPathWithPluginName } from "@utils/getPluginFile";
import throwHandleError from "@utils/errorHandler/error";
import { getPluginCacheByName } from "@commands/plugin/utils/pluginCacheUtils";
import { success, warn } from "@utils/log";
import { installPluginByNpm } from "@commands/plugin/utils";
import { trimString } from "./utils";


const promisifyExec = promisify(exec)

const pluginUpgrade = async (pluginName: string) => {
  const pluginPath = getPluginPathWithPluginName(pluginName)
  // 先查找当前plugin目下下是否有相应的插件目录
  if (!pluginPath) {
    throwHandleError(`wcli plugins目录下不存在${pluginName.bold}插件`)
  }
  const { isNpm, version } = getPluginCacheByName(pluginName)
  if (isNpm) {
    // npm 直接通过npm命令获取版本号
    const { stdout } = await promisifyExec(`npm view ${pluginName} version`);

    if (trimString(stdout) === trimString(version)) {
      // 版本相同直接退出
      warn(`${pluginName}插件已是最新版本-${stdout}`)
      return
    }

    // 重新下载
    fse.removeSync(pluginPath)
    installPluginByNpm(pluginName)
  } else {
    // url的下载 因为都是通过git clone 的形式拉取 直接pull就可以拉取到最新的文件
    const { stdout } = await promisifyExec('git pull', { cwd: pluginPath });
    success(stdout)
  }
}

export default pluginUpgrade
