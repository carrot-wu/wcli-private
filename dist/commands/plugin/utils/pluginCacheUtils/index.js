"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fse = require("fs-extra");
const file_1 = require("../../../../utils/file");
// 插件插件完成时保存相对应的缓存
function writePluginCache(params) {
    const { pluginName, pluginPath } = params;
    // 获取缓存的json文件
    const pluginCachePath = path_1.resolve(file_1.wcliSourcePath, './plugins/cache.json');
    const { version } = fse.readJsonSync(path_1.resolve(pluginPath, './package.json'));
    // 获取插件的版本号
    let writeCacheObj = {
        [pluginName]: Object.assign(Object.assign({}, params), { pluginPath: path_1.normalize(pluginPath).replace(/\\/g, '/'), version })
    };
    if (fse.existsSync(pluginCachePath)) {
        const oldPluginCacheJson = fse.readJsonSync(pluginCachePath);
        writeCacheObj = Object.assign(Object.assign({}, oldPluginCacheJson), writeCacheObj);
    }
    else {
        fse.ensureFileSync(pluginCachePath);
    }
    fse.writeJSONSync(pluginCachePath, writeCacheObj);
}
exports.writePluginCache = writePluginCache;
// 获取插件缓存
function getPluginCacheByName(pluginName) {
    // todo
}
exports.getPluginCacheByName = getPluginCacheByName;
//# sourceMappingURL=index.js.map