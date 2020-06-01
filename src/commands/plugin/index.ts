import throwHandleError from "@utils/errorHandler/error";
import pluginInstall from "./install"
import pluginRemove from "./remove"
import pluginUpgrade from "./upgrade"
import listPlugin from "./list"
import initNewPlugin from "./init"
import linkPlugin from "./link"
import { PluginCommand } from "./types";

interface Options {
  npm: boolean;
}

const noPluginNameType = ["list", "init"]
function pluginCommand(command: PluginCommand, pluginName?: string, options?: Options): void | Promise<string | void> {

  if (noPluginNameType.indexOf(command) === -1 && !pluginName) {
    throwHandleError("请填写需要操作的插件名")
  }
  const { npm: isNpm } = options
  let unCatchableCommand: never
  switch (command) {
    case "install":
      return pluginInstall(pluginName, isNpm);
    case "remove":
      return pluginRemove(pluginName);
    case "upgrade":
    case "update":
      return pluginUpgrade(pluginName);
    case "list":
      return listPlugin();
      // link被本地插件用于开发
    case "link":
        return linkPlugin()
    case "init":
      return initNewPlugin();
    default:
      unCatchableCommand = command
      throwHandleError(`命令plugin [${unCatchableCommand}] 未在wcli进行注册`)
      return unCatchableCommand
  }
}
export default pluginCommand
