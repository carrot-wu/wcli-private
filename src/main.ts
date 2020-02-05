#! /usr/bin/env node
import * as commander from "commander";
import 'colors'
import {packageJson} from './utils/filePath'
import publishAction from "./commands/publish.js";
import errorHandler from './utils/errorHandler/index';

const {version, name} = packageJson
// 注册本地指令
const localCommander = new commander.Command("wcli");

// 注册help通用信息
localCommander
.version(version, "-v, -V, --version")
.name(name.blue)
.usage('[Commands] or wcli [Options]'.blue)

// 注册指令

// 开发模式指令
localCommander
.command('dev [host]')
.option('-d, --debug', 'Starting the develeopment server'.green)
.description(`${'[development]'.blue} ${'open the server with development mode ...'.yellow}`)

// 发布模式指令
localCommander
.command('publish')
.option('-d, --debug', 'Publishing the static file to deploy'.green)
.description(`${'[publish]'.blue} ${'Publishing ...'.yellow}`)
.action(errorHandler(publishAction))

localCommander.parse(process.argv);
