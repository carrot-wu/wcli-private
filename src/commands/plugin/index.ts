import pluginInstall from './install'
import pluginRemove from './remove'
import pluginUpgrade from './upgrade'
import listPlugin from './list'
import { PluginCommand } from './types';
import throwHandleError from '../../utils/errorHandler/error';

interface Options {
  npm: boolean;
}

function pluginCommand(command: PluginCommand, pluginName?: string, options?: Options): void | Promise<string> {
  if (command !== 'list' && !pluginName) {
    throwHandleError('请填写需要操作的插件名')
  }
  const { npm: isNpm } = options
  let unCatchableCommand: never
  switch (command) {
    case 'install':
      return pluginInstall(pluginName, isNpm);
    case 'remove':
      return pluginRemove(pluginName);
    case 'upgrade':
      return pluginUpgrade(pluginName);
    case 'list':
      return listPlugin();
    default:
      unCatchableCommand = command
      throwHandleError(`命令plugin [${unCatchableCommand}] 未在wcli进行注册`)
      return unCatchableCommand
  }
}
export default pluginCommand
