"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const error_1 = require("../errorHandler/error");
const checktype_1 = require("../checktype");
const autoPackageJsonInstall_1 = require("../autoPackageJsonInstall");
/**
 * 获取文件名字
 * @param {string} filePath
 * @returns {string}
 */
const getFileNameByRegx = (filePath) => {
    const fileNameArray = /(^|\/)[^/]+\.(json|js|ts|txt|md|css|html)$/.exec(filePath);
    return checktype_1.isArray(fileNameArray) ? fileNameArray[0].replace('/', '') : filePath;
};
/**
 * 查找wcli目录下是否有plugin插件
 * @param {string} pluginName
 * @returns {string}
 */
function getPluginPathWithPluginName(pluginName) {
    const localProjectPluginPath = path_1.resolve(__dirname, '../../../plugins', pluginName);
    return fs_1.existsSync(localProjectPluginPath) ? localProjectPluginPath : null;
}
exports.getPluginPathWithPluginName = getPluginPathWithPluginName;
/**
 * 根据插件名称获取相应的文件
 * @param {WCliConfigJson} wcliConfigJson
 * @param {string} filePath 文件路径
 * @param {string} fileName 文件名字
 * @returns {any}
 */
function getPluginFileByName(wcliConfigJson, filePath, fileName) {
    const execFileName = fileName || getFileNameByRegx(filePath);
    const { plugin, package: installType } = wcliConfigJson;
    let pluginPath = '';
    // 从本地wcliplugin文件plugin下查找
    if (getPluginPathWithPluginName(plugin)) {
        pluginPath = getPluginPathWithPluginName(plugin);
        // 查找到插件目录了 检查当前插件目录是否有package.json 有的话检查是否有node_modules目录 没有的话帮忙install
        autoPackageJsonInstall_1.default(pluginPath, installType);
    }
    else {
        // 都找不到 提醒装插件
        error_1.default(`请检查插件：${plugin.bold}是否已安装，未安装可使用"${'wcli install plugin [plugin]'.bold}命令进行安装`);
    }
    const pluginFilePath = path_1.resolve(pluginPath, filePath);
    if (!fs_1.existsSync(pluginFilePath)) {
        // 对应的文件不存在
        error_1.default(`插件：${plugin.bold}已安装，但是插件目录下缺少相应的${execFileName.bold}文件`);
    }
    // eslint-disable-next-line
    return require(pluginFilePath);
}
exports.getPluginFileByName = getPluginFileByName;
//# sourceMappingURL=index.js.map