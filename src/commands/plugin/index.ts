import pluginInstall from './install'
import pluginRemove from './remove'
import pluginUpgrade from './upgrade'
import { PluginCommand } from './types';
import throwHandleError from '../../utils/errorHandler/error';

interface Options {
  npm: boolean;
}

function pluginCommand(command: PluginCommand, pluginName: string, options: Options) {
  if (!(command && pluginName)) {
    throwHandleError('请输入正确的指令')
  }
  const { npm: isNpm } = options
  let unCatchableCommand: never
  switch (command) {
    case 'install':
      return pluginInstall(pluginName, isNpm);
    case 'remove':
      return pluginRemove(pluginName);
    case 'upgrade':
      return pluginUpgrade(pluginName, isNpm);
    default:
      unCatchableCommand = command
      throwHandleError(`请检查plugin [${unCatchableCommand} 已经在wcli进行注册]`)
      return unCatchableCommand
  }
}
export default pluginCommand
