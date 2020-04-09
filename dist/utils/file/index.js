"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 根据路径引用相关文件
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const wcliSourcePath = path_1.resolve(__dirname, '../../../');
exports.wcliSourcePath = wcliSourcePath;
// wcli package。json
const packageJson = fs_extra_1.readJsonSync(path_1.resolve(__dirname, '../../../package.json'));
exports.packageJson = packageJson;
// 当前执行命令所在目录
const currentBinPath = process.cwd();
exports.currentBinPath = currentBinPath;
// 执行命令项目文件获取路径方法
const getCurrentBinFilePath = (...path) => path_1.resolve(currentBinPath, ...path);
exports.getCurrentBinFilePath = getCurrentBinFilePath;
// 执行命令项目的wcliconfig.json路径
const currentWcliConfigPath = getCurrentBinFilePath('./wcliconfig.json');
// 执行命令项目的packagejson路径
const currentPackageJsonPath = getCurrentBinFilePath('./package.json');
// 执行命令项目wcliconfig.json
// eslint-disable-next-line
const currentWcliConfig = fs_extra_1.existsSync(currentWcliConfigPath) ? require(currentWcliConfigPath) : null;
exports.currentWcliConfig = currentWcliConfig;
// 执行命令项目packeage.json
// eslint-disable-next-line
const currentPackageJson = fs_extra_1.existsSync(currentPackageJsonPath) ? require(currentPackageJsonPath) : {};
exports.currentPackageJson = currentPackageJson;
//# sourceMappingURL=index.js.map