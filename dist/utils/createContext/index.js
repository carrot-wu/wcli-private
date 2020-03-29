"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const axios_1 = require("axios");
const fse = require("fs-extra");
const file_1 = require("../file");
const gitlab_1 = require("../../commands/publish/gitlab");
const publishWithGit_1 = require("../../commands/publish/publishWithGit");
function createPublishContext(publishExtarParam) {
    const { wcliConfigJson, debug, publishToken, publishCommitMsg } = publishExtarParam;
    return {
        config: {
            wcliConfigJson,
            isDebug: debug,
            token: publishToken,
            publishCommitMsg
        },
        paths: {
            currentBinPath: file_1.currentBinPath
        },
        utils: {
            getCurrentBinFilePath: file_1.getCurrentBinFilePath,
            publishFileWithGitlabCommit: gitlab_1.publishFileWithGitlabCommit,
            publishFileWithGit: publishWithGit_1.default
        },
        toolsModules: {
            prompt: inquirer_1.prompt,
            axios: axios_1.default,
            fse
        }
    };
}
exports.createPublishContext = createPublishContext;
function createDevContext(devExtarParam) {
    const { wcliConfigJson, debug } = devExtarParam;
    return {
        config: {
            wcliConfigJson,
            isDebug: debug
        },
        paths: {
            currentBinPath: file_1.currentBinPath
        },
        utils: {
            getCurrentBinFilePath: file_1.getCurrentBinFilePath
        },
        toolsModules: {
            prompt: inquirer_1.prompt,
            axios: axios_1.default,
            fse
        }
    };
}
exports.createDevContext = createDevContext;
//# sourceMappingURL=index.js.map