#! /usr/bin/env node
import "module-alias/register"
import "colors"
import * as commander from "commander";
import { packageJson } from "@utils/file"
import publishCommand from "./commands/publish";
import pluginCommand from "./commands/plugin";
import devCommand from "./commands/dev";
import buildCommand from "./commands/build";
import upgradeCommand from "./commands/upgrade";
import errorHandler from "./utils/errorHandler/index";
import iconBanner from "./constants/banner";

const { version, name } = packageJson
// 注册本地指令
const localCommander = new commander.Command("wcli");

// 注册help通用信息
localCommander
  .version(version, "-v, -V, --version")
  .name(name.blue)
  .usage(iconBanner)

// 注册指令

// 开发模式指令
localCommander
  .command("dev")
  .option("-d, --debug", "Starting the development server".green)
  .description(`${"[development]".blue}${"开启本地开发模式".yellow}`)
  .action(errorHandler(devCommand))

// 打包模式指令
localCommander
  .command("build")
  .option("-d, --debug", "Building the static file to with extra params".green)
  .description(`${"[build]".blue}${"根据wclicongfig.json的配置执行相应的打包命令".yellow}`)
  .action(errorHandler(buildCommand))
// 发布模式指令
localCommander
  .command("publish")
  .option("-d, --debug", "Publishing the static file to deploy".green)
  .description(`${"[publish]".blue}${"打包发布项目到wclicongfig.json下的制定仓库".yellow}`)
  .action(errorHandler(publishCommand))

// 插件相关指令
localCommander
  .command("plugin [command] [pluginName]")
  .option("-n, --npm", "通过npm包名的形式下载插件".green)
  .description(`${"[plugin] [command]".blue}${"新增，更新，删除等一系列插件操作方法".yellow}`)
  .action(errorHandler(pluginCommand))

// wcli升级指令
localCommander
  .command("upgrade")
  .option("-r, --rebase", "通过merge的形式更新wcli".green)
  .description(`${"[upgrade]".blue}${"手动更新wcli脚手架".yellow}`)
  .action(errorHandler(upgradeCommand))


localCommander.parse(process.argv);
