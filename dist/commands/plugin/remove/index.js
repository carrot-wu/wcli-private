"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fse = require("fs-extra");
const getPluginFile_1 = require("../../../utils/getPluginFile");
const error_1 = require("../../../utils/errorHandler/error");
const log_1 = require("../../../utils/log");
const pluginRemove = (pluginName) => {
    const pluginPath = getPluginFile_1.getPluginPathWithPluginName(pluginName);
    // 先查找当前plugin目下下是否有相应的插件目录
    if (!pluginPath) {
        error_1.default(`wcli plugins目录下不存在${pluginName.bold}插件`);
    }
    // 删除插件
    log_1.loading(`插件${pluginName.bold}正在删除中`);
    fse.removeSync(pluginPath);
    log_1.success(`插件${pluginName.bold}删除成功！`);
};
exports.default = pluginRemove;
//# sourceMappingURL=index.js.map