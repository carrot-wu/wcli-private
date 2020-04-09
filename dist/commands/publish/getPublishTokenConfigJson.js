"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fse = require("fs-extra");
const error_1 = require("../../utils/errorHandler/error");
// 缓存路径
const cacheConfigJsonPath = path.resolve(__dirname, '../../config.json');
function getTokenCacheConfig() {
    if (fse.existsSync(cacheConfigJsonPath)) {
        // 存在直接返回
        // eslint-disable-next-line
        return require(cacheConfigJsonPath);
    }
    try {
        fse.outputJSONSync(cacheConfigJsonPath, { pluginCacheToken: {} });
        return fse.readJsonSync(cacheConfigJsonPath);
    }
    catch (e) {
        error_1.default('创建config.json失败');
    }
}
exports.default = getTokenCacheConfig;
//# sourceMappingURL=getPublishTokenConfigJson.js.map