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
const path = require("path");
const fse = require("fs-extra");
const axios_1 = require("axios");
const api_1 = require("./api");
const directorWalker_1 = require("../../../utils/file/directorWalker");
const file_1 = require("../../../utils/file");
const utils_1 = require("./utils");
const checkFileIsText_1 = require("../../../utils/file/checkFileIsText");
const log = require("../../../utils/log");
// 获取分支最新commit
function getLatestCommitId(publishConfig, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = api_1.getSingleBranch(publishConfig);
        const { data } = yield axios_1.default.get(url, {
            headers: {
                'PRIVATE-TOKEN': token,
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        return data.commit.id;
    });
}
exports.getLatestCommitId = getLatestCommitId;
function publishFileWithGitlabCommit(publishParams) {
    return __awaiter(this, void 0, void 0, function* () {
        const { publishConfig, commitMsg, token } = publishParams;
        const { git, repository, target, branch = 'master', dist = 'dist' } = publishConfig;
        // 命令行执行的dist目录地址
        const binDistFilePath = file_1.getCurrentBinFilePath(dist);
        // 获取commit api
        const commitUrl = api_1.getPublishCommitApi(git, repository);
        // 构建commit数组
        const actions = [];
        // 先获取目标分支的树形结构
        const treeArray = yield utils_1.getBranchFileTree(Object.assign(Object.assign({}, publishConfig), { token }));
        // 删除文件
        treeArray.forEach((file) => {
            actions.push({
                action: 'delete',
                file_path: file.path
            });
        });
        // 获取构建好的静态文件夹
        const distFileArray = yield directorWalker_1.directorWalker(binDistFilePath);
        // 添加新生成的静态文件
        distFileArray.forEach((distPath) => {
            // 把绝对路径处理成相对路径
            const relativePath = path.relative(binDistFilePath, distPath);
            const filePath = path.normalize(path.join(target, relativePath)).replace(/\\/g, '/');
            // 判断是文本还是二进制格式
            const isTextFile = checkFileIsText_1.checkIsTextFile(distPath);
            actions.push({
                action: 'create',
                file_path: filePath,
                content: fse.readFileSync(distPath, isTextFile ? 'utf8' : 'base64'),
                encoding: isTextFile ? 'text' : 'base64'
            });
        });
        // 开始提交commit
        const commit = {
            branch,
            commit_message: commitMsg,
            actions
        };
        try {
            log.loading(`开始上传静态到远程仓库[${repository.bold}]`);
            const res = yield axios_1.default.post(commitUrl, commit, {
                headers: {
                    'PRIVATE-TOKEN': token,
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json'
                }
            });
            if (res && res.data && res.data.id) {
                log.success('上传成功');
                return res.data.id;
            }
            log.error('上传失败');
            return Promise.reject(res.statusText);
        }
        catch (e) {
            log.error('上传失败');
            throw e;
        }
    });
}
exports.publishFileWithGitlabCommit = publishFileWithGitlabCommit;
//# sourceMappingURL=commits.js.map