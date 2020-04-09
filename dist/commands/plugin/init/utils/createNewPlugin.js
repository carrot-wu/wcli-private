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
const fse = require("fs-extra");
const path_1 = require("path");
const file_1 = require("../../../../utils/file");
const error_1 = require("../../../../utils/errorHandler/error");
const log_1 = require("../../../../utils/log");
function createNewPlugin() {
    return __awaiter(this, void 0, void 0, function* () {
        const pluginTemplatePath = path_1.resolve(file_1.wcliSourcePath, 'template/defaultPluginTemplate');
        const promptInputMsg = {
            type: 'input',
            message: '请输入要开发的新插件名称',
            name: 'pluginName',
            validate(val) {
                const trimVal = val.replace(/(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g, '');
                if (trimVal) {
                    return true;
                }
                return '插件名称不能为空';
            },
            filter: (val) => val.replace(/(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g, '')
        };
        const { pluginName } = yield inquirer_1.prompt([promptInputMsg]);
        const pluginDirName = path_1.resolve(file_1.currentBinPath, pluginName);
        if (fse.existsSync(pluginDirName)) {
            // 检查目录是否已创建
            error_1.default(`当前插件目录${pluginName.bold}已存在与当前文件夹，请勿重复创建`);
        }
        log_1.loading('插件模板创建中...');
        // 创建目录
        yield fse.ensureDir(pluginDirName);
        // 复制模板文件
        yield fse.copy(pluginTemplatePath, pluginDirName);
        log_1.success('插件模板创建成功...');
    });
}
exports.default = createNewPlugin;
//# sourceMappingURL=createNewPlugin.js.map