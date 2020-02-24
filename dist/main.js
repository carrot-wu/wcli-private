#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
require("colors");
const file_1 = require("./utils/file");
const publish_1 = require("./commands/publish");
const plugin_1 = require("./commands/plugin");
const index_1 = require("./utils/errorHandler/index");
const { version, name } = file_1.packageJson;
// 注册本地指令
const localCommander = new commander.Command('wcli');
// 注册help通用信息
localCommander
    .version(version, '-v, -V, --version')
    .name(name.blue)
    .usage('[Commands] or wcli [Options]'.blue);
// 注册指令
// 开发模式指令
localCommander
    .command('dev [host]')
    .option('-d, --debug', 'Starting the development server'.green)
    .description(`${'[development]'.blue}${'开启本地开发模式'.yellow}`);
// 发布模式指令
localCommander
    .command('publish')
    .option('-d, --debug', 'Publishing the static file to deploy'.green)
    .description(`${'[publish]'.blue}${'打包发布项目到wclicongfig,json下的制定仓库'.yellow}`)
    .action(index_1.default(publish_1.default));
// 插件相关指令
localCommander
    .command('plugin [command] [pluginName]')
    .option('-n, --npm', '通过npm包名的形式下载插件'.green)
    .description(`${'[plugin] [command]'.blue}${'新增，更新，删除等一系列插件操作方法'.yellow}`)
    .action(index_1.default(plugin_1.default));
localCommander.parse(process.argv);
//# sourceMappingURL=main.js.map