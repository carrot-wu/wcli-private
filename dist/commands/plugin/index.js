"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const install_1 = require("./install");
const remove_1 = require("./remove");
const upgrade_1 = require("./upgrade");
const error_1 = require("../../utils/errorHandler/error");
function pluginCommand(command, pluginName, options) {
    if (!(command && pluginName)) {
        error_1.default('请输入正确的指令');
    }
    const { npm: isNpm } = options;
    let unCatchableCommand;
    switch (command) {
        case 'install':
            return install_1.default(pluginName, isNpm);
        case 'remove':
            return remove_1.default(pluginName);
        case 'upgrade':
            return upgrade_1.default(pluginName, isNpm);
        default:
            unCatchableCommand = command;
            error_1.default(`请检查plugin [${unCatchableCommand} 已经在wcli进行注册]`);
            return unCatchableCommand;
    }
}
exports.default = pluginCommand;
//# sourceMappingURL=index.js.map