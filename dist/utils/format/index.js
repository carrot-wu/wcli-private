"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checktype_1 = require("../checktype");
const error_1 = require("../errorHandler/error");
const constants_1 = require("../../constants");
// 初始化wcliconfig.json文件 不合法的话直接抛出错误
// eslint-disable-next-line consistent-return
function formatWCliConfigJson(wcliConfiJson) {
    if (checktype_1.isPlainObject(wcliConfiJson) && wcliConfiJson.name && wcliConfiJson.plugin) {
        return Object.assign(Object.assign({}, constants_1.defaultWCliConfigJson), wcliConfiJson);
    }
    error_1.default('wcliconfig.json不合法，请检查是否缺少name或者plugin属性');
}
exports.formatWCliConfigJson = formatWCliConfigJson;
//# sourceMappingURL=index.js.map