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
const file_1 = require("../../utils/file");
const error_1 = require("../../utils/errorHandler/error");
const format_1 = require("../../utils/format");
const getPluginFile_1 = require("../../utils/getPluginFile");
const checktype_1 = require("../../utils/checktype");
const createContext_1 = require("../../utils/createContext");
const utils_1 = require("./utils");
const gitlab_1 = require("./gitlab");
const PUBLISH_FILE = 'publish.js';
// 发布模式命令
const publishCommand = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const debug = options.debug || false;
    // 获取当前目录下的配置文件wcliconfig.json
    if (!file_1.currentWcliConfig) {
        error_1.default('当前目录缺少wcliconfig.json文件');
    }
    // 获取配置
    const wcliConfigJson = format_1.formatWCliConfigJson(file_1.currentWcliConfig);
    // 获取插件的publish.js文件
    const publishFile = getPluginFile_1.getPluginFileByName(wcliConfigJson, PUBLISH_FILE);
    if (!checktype_1.isFunction(publishFile)) {
        error_1.default(`${PUBLISH_FILE} is not the function`);
    }
    // 获取发布仓库的token
    const token = yield utils_1.getPublishGitToken(wcliConfigJson);
    // 获取此次发布填写的commitMessage
    const publishCommitMsg = yield gitlab_1.getCommitMessage();
    // 把一些通用上下文参数和方法注入
    return publishFile(createContext_1.createPublishContext({ wcliConfigJson, debug, publishToken: token, publishCommitMsg }));
});
exports.default = publishCommand;
//# sourceMappingURL=index.js.map