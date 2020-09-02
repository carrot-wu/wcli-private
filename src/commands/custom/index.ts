// 自定义模式命令
import { WCliConfigJson } from '@srcTypes/configJsonType';
import { currentWcliConfig } from '@utils/file';
import throwHandleError from '@utils/errorHandler/error';
import { formatWCliConfigJson } from '@utils/format';
import { getPluginFileByName } from '@utils/getPluginFile';
import { isFunction } from '@utils/checktype';
import { createCustomContext } from '@utils/createContext';

const CUSTOM_FILE = 'custom.js';

const customCommand = async (command: string, extraCommands: any) => {
  // 没有输入自定义指令
  if (!command) {
    throwHandleError('请输入要执行的自定义命令');
  }
  // 获取传入的剩余指令
  const extraArgArray: string[] = extraCommands.args.slice(1);
  // 获取当前目录下的配置文件wcliconfig.json
  if (!currentWcliConfig) {
    throwHandleError('当前目录缺少wcliconfig.json文件');
  }
  // 获取配置
  const wcliConfigJson: WCliConfigJson = formatWCliConfigJson(currentWcliConfig);

  // 获取插件的custom.js文件
  const customFile = getPluginFileByName(wcliConfigJson, CUSTOM_FILE);

  // 获取custom注册的指令
  const currentCustomCommand = customFile[command];
  if (!isFunction(currentCustomCommand)) {
    throwHandleError(`${command} is not the function`);
  }
  // 把一些通用上下文参数和方法注入
  return currentCustomCommand(createCustomContext({ wcliConfigJson, extraArgArray }));
};

export default customCommand;
