"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fse = require("fs-extra");
const compressing = require("compressing");
const child_process_1 = require("child_process");
const checktype_1 = require("../../../utils/checktype");
const getPluginFile_1 = require("../../../utils/getPluginFile");
const error_1 = require("../../../utils/errorHandler/error");
const log_1 = require("../../../utils/log");
const autoPackageJsonInstall_1 = require("../../../utils/autoPackageJsonInstall");
const pluginCacheUtils_1 = require("./pluginCacheUtils");
const download = require("download-git-repo");
// 根据git的地址获取实际的插件名字
function getPluginNameByPluginGitPath(pluginGitPath) {
    const PluginNameArray = /\/([^/]+)\.git$/.exec(pluginGitPath);
    return checktype_1.isArray(PluginNameArray) ? PluginNameArray[1] : pluginGitPath;
}
/**
 * promise化下载plugin方法
 * @param {string} path
 * @param {string} downloadPluginPath
 * @returns {Promise<string>}
 */
function downloadPluginByPath(path, downloadPluginPath) {
    return new Promise((resolveDownload, rejectDownload) => {
        download(path, downloadPluginPath, { clone: true }, (error) => {
            if (error) {
                rejectDownload(error);
            }
            else {
                resolveDownload(downloadPluginPath);
            }
        });
    });
}
// 获取实际download-git-repo下载地址
function getDownloadGitRepoPath(pluginGitPath) {
    if (/github/.test(pluginGitPath)) {
        // github项目 获取拥有者以及仓库名
        const downloadGithubPathArray = /github\.com[:/](.+)\.git$/.exec(pluginGitPath);
        return checktype_1.isArray(downloadGithubPathArray) ? downloadGithubPathArray[1] : pluginGitPath;
    }
    if (/gitlab/.test(pluginGitPath)) {
        const downloadGitLabPathArray = /(?:git@|https:\/\/)(.+)\.git$/.exec(pluginGitPath);
        const downloadGitlabPath = checktype_1.isArray(downloadGitLabPathArray) ? downloadGitLabPathArray[1] : pluginGitPath;
        return `gitlab:${downloadGitlabPath.replace('.com/', '.com:')}`;
    }
    // 错误 不符合github或者gitlab
    error_1.default('请检查插件地址是否正确，插件安装地址目前只支持[github]和[gitlab]');
}
exports.getDownloadGitRepoPath = getDownloadGitRepoPath;
/**
 * 根据git地址下载相应的插件
 * @param {string} pluginGitPath 插件地址
 * @returns {Promise<string>}
 */
function downloadPluginByGit(pluginGitPath) {
    return __awaiter(this, void 0, void 0, function* () {
        // 获取插件名称
        const pluginName = getPluginNameByPluginGitPath(pluginGitPath);
        // 先检查插件是否已经安装了
        if (getPluginFile_1.getPluginPathWithPluginName(pluginName)) {
            error_1.default('插件已在plugin目录下存在，请勿重新安装');
        }
        const downloadPath = getDownloadGitRepoPath(pluginGitPath);
        // 未安装 安装插件
        log_1.loading(`下载插件[${pluginName}]中，请耐心等候...`);
        // 安装插件的地址
        const pluginsDirectionPath = path_1.resolve(__dirname, '../../../plugins');
        const downloadPluginPath = path_1.resolve(pluginsDirectionPath, pluginName);
        // 插件下载前先创建目录结构
        yield fse.ensureDir(downloadPluginPath);
        try {
            yield downloadPluginByPath(downloadPath, downloadPluginPath);
            log_1.success(`插件[${pluginName}]下载成功，正在安装插件所需依赖`);
            autoPackageJsonInstall_1.default(downloadPluginPath, 'yarn');
            log_1.success(`插件依赖[${pluginName}]安装成功，你可以在项目中使用该插件！`);
            // 写入缓存
            pluginCacheUtils_1.writePluginCache({
                pluginName,
                isNpm: false,
                args: pluginGitPath,
                pluginPath: downloadPluginPath
            });
            return downloadPluginPath;
        }
        catch (e) {
            error_1.default(e.message);
        }
    });
}
exports.downloadPluginByGit = downloadPluginByGit;
/**
 * 用npm包的形式下载插件
 * @param {string} npmName 包的名字
 * @returns {Promise<string>}
 */
function installPluginByNpm(npmName) {
    return __awaiter(this, void 0, void 0, function* () {
        // 首先检测当前npm包是否存在
        try {
            child_process_1.execSync(`npm info ${npmName}`);
        }
        catch (e) {
            error_1.default(`npm registry中查找不到相对应的插件：${npmName.bold}`);
        }
        // 先检查插件是否已经安装了
        if (getPluginFile_1.getPluginPathWithPluginName(npmName)) {
            error_1.default('插件已在plugin目录下存在，请勿重新安装');
        }
        // 未安装 安装插件
        log_1.loading(`下载插件[${npmName}]中，请耐心等候...`);
        // 安装插件的地址
        const pluginsDirectionPath = path_1.resolve(__dirname, '../../../plugins');
        const downloadPluginPath = path_1.resolve(pluginsDirectionPath, npmName);
        const templatePluginPath = path_1.resolve(pluginsDirectionPath, '__TEMPLATE__');
        // 插件下载前先创建目录结构以及一个临时目录
        yield Promise.all([fse.ensureDir(downloadPluginPath), fse.ensureDir(templatePluginPath)]);
        try {
            // 下载npm的压缩文件夹
            child_process_1.execSync(`npm pack ${npmName}`, { cwd: templatePluginPath, stdio: 'inherit' });
            const fileNameArray = yield fse.readdir(templatePluginPath);
            const downloadPluginTgz = fileNameArray.find((fileName) => fileName.includes('.tgz'));
            const downloadPluginTgzPath = path_1.resolve(templatePluginPath, downloadPluginTgz);
            // 对.tgz的压缩文件进行解压
            yield compressing.tgz.uncompress(downloadPluginTgzPath, templatePluginPath);
            // 把文件移动出package
            const downloadPluginPackagePath = path_1.resolve(templatePluginPath, './package');
            yield fse.move(downloadPluginPackagePath, downloadPluginPath, { overwrite: true });
            // 删除临时文件夹
            yield fse.remove(templatePluginPath);
            autoPackageJsonInstall_1.default(downloadPluginPath, 'yarn');
            log_1.success(`插件[${npmName}]安装成功，你可以在项目中使用该插件！`);
            // 写入缓存
            pluginCacheUtils_1.writePluginCache({
                pluginName: npmName,
                isNpm: true,
                args: npmName,
                pluginPath: downloadPluginPath
            });
            return downloadPluginPath;
        }
        catch (e) {
            error_1.default(e.message);
        }
    });
}
exports.installPluginByNpm = installPluginByNpm;
//# sourceMappingURL=index.js.map