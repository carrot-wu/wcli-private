// 初始化项目的命令
import initNewWcliConfigJson from '@commands/init/initWcliConfig';
import throwHandleError from '@utils/errorHandler/error';
import initReact from '@commands/init/initReact';
import initVue from '@commands/init/initVue';
import initRollup from '@commands/init/initRollup';
import { InitCommand } from './types';

// 现在默认只支持初始化生成默认的wcliconfig.json文件

export default function init(command: InitCommand) {
  let unHandledInitCommand: never;
  switch (command) {
    // 初始化新的wcliconfig.json文件
    case 'wcliconfig':
    case 'wj':
      return initNewWcliConfigJson();
    case 'react':
      return initReact();
    case 'vue':
      return initVue();
    case 'rollup':
      return initRollup();
    default:
      unHandledInitCommand = command;
      throwHandleError(`命令init [${unHandledInitCommand}] 未在wcli进行注册`);
      return unHandledInitCommand;
  }
}
