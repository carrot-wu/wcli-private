#! /usr/bin/env node
import * as moduleAlias from 'module-alias';
import 'colors';
import * as path from 'path';

const getAliasPath = (aliasPath: string) => path.resolve(__dirname, aliasPath);
moduleAlias(getAliasPath('../'));

/* eslint-disable import/first */
import * as commander from 'commander';
import notifyUpdate from '@utils/notifyUpdate';
import errorHandler from '@utils/errorHandler';
import iconBanner from '@constants/banner';
import { packageJson } from '@utils/file';
import {
  initCommand,
  devCommand,
  buildCommand,
  pluginCommand,
  publishCommand,
  upgradeCommand,
  customCommand,
} from './commands';

const { version, name } = packageJson;
// 注册本地指令
const localCommander = new commander.Command('wcli');

// 注册help通用信息
localCommander.version(version, '-v, -V, --version').name(name.blue).usage(iconBanner);

// 注册指令

// 初始化模式指令
localCommander
  .command('init [command]')
  .description(`${'[init]'.blue}${'通过init命令创建初始化wcliconfig.json, vue, react rollup等模板'.yellow}`)
  .action(errorHandler(initCommand));

// 开发模式指令
localCommander
  .command('dev')
  .option('-d, --debug', 'Starting the development server'.green)
  .description(`${'[development]'.blue}${'开启本地开发模式'.yellow}`)
  .action(errorHandler(devCommand));

// 打包模式指令
localCommander
  .command('build')
  .option('-d, --debug', 'Building the static file to with extra params'.green)
  .description(`${'[build]'.blue}${'根据wclicongfig.json的配置执行相应的打包命令'.yellow}`)
  .action(errorHandler(buildCommand));
// 发布模式指令
localCommander
  .command('publish')
  .option('-d, --debug', 'Publishing the static file to deploy'.green)
  .description(`${'[publish]'.blue}${'打包发布项目到wclicongfig.json下的制定仓库'.yellow}`)
  .action(errorHandler(publishCommand));

// 自定义指令
localCommander
  .command('custom [command]')
  .description(`${'[custom]'.blue}${'通过插件预设的方式支持除了wcli内置之外的自定义指令'.yellow}`)
  .action(errorHandler(customCommand));

// 插件相关指令
localCommander
  .command('plugin [command] [pluginName]')
  .option('-n, --npm', '通过npm包名的形式下载插件'.green)
  .description(`${'[plugin] [command]'.blue}${'新增，更新，删除等一系列插件操作方法'.yellow}`)
  .action(errorHandler(pluginCommand));

// wcli升级指令
localCommander
  .command('upgrade')
  .option('-y, --yarn', '通过yarn的命令更新wcli脚手架'.green)
  .description(`${'[upgrade]'.blue}${'手动更新wcli脚手架'.yellow}`)
  .action(errorHandler(upgradeCommand));

localCommander.parse(process.argv);

// 检查更新wcli以及npm下载的插件是否需要更新
notifyUpdate();
