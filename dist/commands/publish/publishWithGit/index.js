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
const simpleGit = require("simple-git/promise");
const fse = require("fs-extra");
const path = require("path");
const gitlab_1 = require("../gitlab");
const error_1 = require("../../../utils/errorHandler/error");
const utils_1 = require("./utils");
const file_1 = require("../../../utils/file");
const log = require("../../../utils/log");
const isGithubRepo = (git) => /github.com/.test(git);
function publishFileWithGit(publishParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const { publishConfig, commitMsg } = publishParams;
        const { git, target, repository, publishGitDir, branch = 'master', dist = 'dist' } = publishConfig;
        // 命令行执行的dist目录地址
        const binDistFilePath = file_1.getCurrentBinFilePath(dist);
        if (!publishGitDir) {
            // 如果是github的话那么提示填写本机仓库路径 不然的话调用gitlab方法
            return isGithubRepo(git) ? error_1.default('github的发布需要填写本机发布git仓库的绝对路径') : gitlab_1.publishFileWithGitlabCommit(publishParams);
        }
        // 检查当前路径是否git目录
        if (!utils_1.checkPathIsGitDir(publishGitDir)) {
            error_1.default(`路径：${publishGitDir}缺少.git目录`);
        }
        const publishGit = simpleGit(publishGitDir);
        // 检查当前目录是否有为暂存的文件
        const publishDirStatus = yield publishGit.status();
        if (publishDirStatus.files.length > 0) {
            error_1.default('当前发布仓库有任未发布的文件，请在执行publish前提前进行提交');
        }
        // 查看branch 远程分支是否存在
        const { all } = yield publishGit.branch(['-r']);
        if (all.indexOf(`origin/${branch}`) === -1) {
            error_1.default(`远程分支：${branch}不存在`);
        }
        // 切换分支并且进行更新
        yield publishGit.checkout(branch);
        yield publishGit.pull('origin', branch, { '--rebase': 'true' });
        // 先删除发布目录target下除了.git的文件夹
        const workDir = path.resolve(publishGitDir, target);
        const fileList = fse.readdirSync(workDir);
        const removePromiseArray = fileList.filter((fileName) => fileName !== '.git').map((fileName) => fse.remove(path.resolve(workDir, fileName)));
        // 进行删除
        yield Promise.all(removePromiseArray);
        // copy dist文件到当前目录中
        yield fse.copy(binDistFilePath, workDir);
        // 拷贝成功 进行add
        yield publishGit.add('.');
        const changeFileStatus = yield publishGit.status();
        if (changeFileStatus.files.length > 0) {
            // 生成commit进行提交
            yield publishGit.commit(commitMsg);
            log.loading(`开始推送文件到远程仓库[${repository.bold}]`);
            yield publishGit.push();
            log.success(`推送成功，代码已发布至分支${branch}`);
        }
        else {
            // 文件没有修改 直接提示退出
            log.info('当前项目代码已是最新，不用进行提交！');
        }
    });
}
exports.default = publishFileWithGit;
//# sourceMappingURL=index.js.map