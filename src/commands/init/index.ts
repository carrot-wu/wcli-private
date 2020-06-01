// 初始化项目的命令
import {InitCommand} from "./types";
import initNewWcliConfigJson from "@commands/init/initWcliConfig";
import throwHandleError from "@utils/errorHandler/error";

// 现在默认只支持初始化生成默认的wcliconfig.json文件

export default function init(command: InitCommand) {
  let unHandledInitCommand: never
  switch (command) {
    // 初始化新的wcliconfig.json文件
    case 'wcliconfig' :
    case 'wj' :
      return initNewWcliConfigJson();
    case 'react':
    case 'vue':
      return false;
    default :
      unHandledInitCommand = command;
      throwHandleError(`命令init [${unHandledInitCommand}] 未在wcli进行注册`)
      return unHandledInitCommand
  }
}
