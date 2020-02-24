"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const error_1 = require("../../../utils/errorHandler/error");
const pluginInstall = (pluginNpmNameOrPath, isNpm = false) => {
    if (isNpm) {
        // 使用npm包的形式下载插件
        error_1.default('使用npm包下载插件正在开发中，请耐心等候');
    }
    else {
        // 使用git的形式下载插件
        return utils_1.downloadPluginByGit(pluginNpmNameOrPath);
    }
};
exports.default = pluginInstall;
//# sourceMappingURL=index.js.map