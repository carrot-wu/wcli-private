"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fse = require("fs-extra");
const getPluginFile_1 = require("../../../utils/getPluginFile");
const error_1 = require("../../../utils/errorHandler/error");
// 展示已安装的插件列表
function listPlugin() {
    // 获取缓存的json文件
    const pluginCachePath = getPluginFile_1.getPluginPathWithPluginName('./cache.json');
    if (fse.existsSync(pluginCachePath)) {
        const pluginCacheJson = fse.readJsonSync(pluginCachePath);
        const listArray = Object.values(pluginCacheJson).map((_a) => {
            var { args } = _a, listObj = __rest(_a, ["args"]);
            return listObj;
        });
        console.table(listArray);
        process.exit(1);
    }
    else {
        error_1.default('暂无安装相应的插件列表');
    }
}
exports.default = listPlugin;
//# sourceMappingURL=index.js.map