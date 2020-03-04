"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const pluginInstall = (pluginNpmNameOrPath, isNpm = false) => {
    if (isNpm) {
        // 使用npm包的形式下载插件
        return utils_1.installPluginByNpm(pluginNpmNameOrPath);
    }
    // 使用git的形式下载插件
    return utils_1.downloadPluginByGit(pluginNpmNameOrPath);
};
exports.default = pluginInstall;
//# sourceMappingURL=index.js.map