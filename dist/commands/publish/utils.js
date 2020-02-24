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
const inquirer_1 = require("inquirer");
const fs_extra_1 = require("fs-extra");
const path = require("path");
const error_1 = require("../../utils/errorHandler/error");
const token_1 = require("../../constants/token");
const getPublishTokenConfigJson_1 = require("./getPublishTokenConfigJson");
const configJson = getPublishTokenConfigJson_1.default();
// 获取提交文件到github或者gitlab的
function checkPublishGitToken(plugin) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line
        const pluginCacheToken = configJson.pluginCacheToken;
        // 检查是否有token
        const pluginToken = pluginCacheToken[plugin];
        // 有的话直接返回
        if (pluginToken)
            return pluginToken;
        // 不存在 获取是否有其余的项目已经填写了token 需要把NOT_NEED_TOKEN不需要填写token的剔除
        const hasTokenPluginArray = Object.keys(pluginCacheToken).filter((pluginName) => pluginCacheToken[pluginName] && pluginCacheToken[pluginName] !== token_1.NOT_NEED_TOKEN);
        const hasPluginTokenChoices = hasTokenPluginArray.map((token) => ({ key: token, name: token, value: token }));
        const choices = hasPluginTokenChoices.concat(...token_1.defaultTokenConfigArray);
        const message = hasPluginTokenChoices.length
            ? '初次发布私有项目需要使用发布仓库的token才能进行验证提交，您也可以选择使用其他插件的token进行提交'
            : '初次发布私有项目需要使用发布仓库的token才能进行验证提交';
        const promptSelectToken = {
            type: 'list',
            message,
            name: 'token',
            choices
        };
        const { token } = yield inquirer_1.prompt([promptSelectToken]);
        if (token !== token_1.ADD_NEW_TOKEN) {
            // 使用之前插件的token
            return pluginCacheToken[token];
        }
        // 不需要设置token 不需要验证 后续不提示填写token
        if (token === token_1.NOT_NEED_TOKEN) {
            return token;
        }
        // 重新输入一个token
        const promptInputToken = {
            type: 'input',
            message: '请输入发布仓库的token',
            name: 'newToken',
            validate(val) {
                const trimVal = val.replace(/(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g, '');
                if (trimVal) {
                    return true;
                }
                return 'token不能为空';
            },
            filter: (val) => val.replace(/(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g, '')
        };
        const { newToken } = yield inquirer_1.prompt([promptInputToken]);
        return newToken;
    });
}
exports.checkPublishGitToken = checkPublishGitToken;
function getPublishGitToken(wCliConfigJson) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line
        const pluginCacheToken = configJson.pluginCacheToken;
        const { plugin } = wCliConfigJson;
        const token = yield checkPublishGitToken(plugin);
        if (!pluginCacheToken[plugin]) {
            // config.json没有token用户输入完之后保存到文件当中
            const configPath = path.resolve(__dirname, '../../config.json');
            const newConfigJson = Object.assign(Object.assign({}, configJson), { pluginCacheToken: Object.assign(Object.assign({}, configJson.pluginCacheToken), { [plugin]: token }) });
            try {
                yield fs_extra_1.writeJSON(configPath, newConfigJson);
            }
            catch (e) {
                error_1.default('保存token失败');
            }
        }
        if (token !== token_1.NOT_NEED_TOKEN)
            return token;
    });
}
exports.getPublishGitToken = getPublishGitToken;
//# sourceMappingURL=utils.js.map