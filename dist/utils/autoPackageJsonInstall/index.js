"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const child_process_1 = require("child_process");
const log_1 = require("../log");
/**
 * 检查path目录下是否有node_Modules和package.json
 * 没有的话帮忙install
 * @param {string} path
 * @param {InstallType} installType
 */
function autoPackageJsonInstall(path, installType) {
    const nodeModulesPath = path_1.resolve(path, 'node_modules');
    const packageJsonPath = path_1.resolve(path, 'package.json');
    // 存在package 不存在node_modules
    if (fs_1.existsSync(packageJsonPath) && !fs_1.existsSync(nodeModulesPath)) {
        log_1.loading('相关依赖安装中...');
        child_process_1.execSync(`${installType} install`, { cwd: path, stdio: 'inherit' });
        log_1.success('依赖安装成功！');
    }
}
exports.default = autoPackageJsonInstall;
//# sourceMappingURL=index.js.map