#! /usr/bin/env node
import * as commander from 'commander';
import 'colors'
import { packageJson } from './utils/file'
import publishCommand from './commands/publish';
import pluginCommand from './commands/plugin';
import errorHandler from './utils/errorHandler/index';

const { version, name } = packageJson
// 注册本地指令
const localCommander = new commander.Command('wcli');

// 注册help通用信息
localCommander
  .version(version, '-v, -V, --version')
  .name(name.blue)
  .usage('[Commands] or wcli [Options]'.blue)

// 注册指令

// 开发模式指令
localCommander
  .command('dev [host]')
  .option('-d, --debug', 'Starting the development server'.green)
  .description(`${'[development]'.blue}${'开启本地开发模式'.yellow}`)

// 发布模式指令
localCommander
  .command('publish')
  .option('-d, --debug', 'Publishing the static file to deploy'.green)
  .description(`${'[publish]'.blue}${'打包发布项目到wclicongfig,json下的制定仓库'.yellow}`)
  .action(errorHandler(publishCommand))

// 插件相关指令
localCommander
  .command('plugin [command] [pluginName]')
  .option('-n, --npm', '通过npm包名的形式下载插件'.green)
  .description(`${'[plugin] [command]'.blue}${'新增，更新，删除等一系列插件操作方法'.yellow}`)
  .action(errorHandler(pluginCommand))


localCommander.parse(process.argv);
