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
/**
 * 获取填写的提交commit message
 * @returns {Promise<string>}
 */
function getCommitMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        const promptInputMsg = {
            type: 'input',
            message: '请输入commit message',
            name: 'commitMsg',
            validate(val) {
                const trimVal = val.replace(/(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g, '');
                if (trimVal) {
                    return true;
                }
                return 'commit message不能为空';
            },
            filter: (val) => val.replace(/(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g, '')
        };
        const { commitMsg } = yield inquirer_1.prompt([promptInputMsg]);
        return commitMsg;
    });
}
exports.getCommitMessage = getCommitMessage;
//# sourceMappingURL=getCommitMessage.js.map