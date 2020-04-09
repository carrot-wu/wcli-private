"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const install_1 = require("./install");
const remove_1 = require("./remove");
const upgrade_1 = require("./upgrade");
const list_1 = require("./list");
const init_1 = require("./init");
const error_1 = require("../../utils/errorHandler/error");
const noPluginNameType = ['list', 'init'];
function pluginCommand(command, pluginName, options) {
    console.log(command);
    if (noPluginNameType.indexOf(command) === -1 && !pluginName) {
        error_1.default('请填写需要操作的插件名');
    }
    const { npm: isNpm } = options;
    let unCatchableCommand;
    switch (command) {
        case 'install':
            return install_1.default(pluginName, isNpm);
        case 'remove':
            return remove_1.default(pluginName);
        case 'upgrade':
            return upgrade_1.default(pluginName);
        case 'list':
            return list_1.default();
        case 'init':
            return init_1.default();
        default:
            unCatchableCommand = command;
            error_1.default(`命令plugin [${unCatchableCommand}] 未在wcli进行注册`);
            return unCatchableCommand;
    }
}
exports.default = pluginCommand;
//# sourceMappingURL=index.js.map