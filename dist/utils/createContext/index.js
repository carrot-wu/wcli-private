"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const axios_1 = require("axios");
const fse = require("fs-extra");
const file_1 = require("../file");
const gitlab_1 = require("../../commands/publish/gitlab");
const publishWithGit_1 = require("../../commands/publish/publishWithGit");
function createPublishContext(extarParam) {
    const { wcliConfigJson, debug, publishToken, publishCommitMsg } = extarParam;
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
//# sourceMappingURL=index.js.map