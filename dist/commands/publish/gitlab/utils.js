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
const axios_1 = require("axios");
const api_1 = require("./api");
/**
 * 获取分支文件结构
 * @param {BranchFileTreeParams} params
 * @returns {Promise<BranchFileTreeRes[]>}
 */
function getBranchFileTree(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { git, repository, token, branch = 'master', target } = params;
        const url = api_1.getBranchFileTreeApi(git, repository);
        const { data } = yield axios_1.default.get(url, {
            headers: {
                'PRIVATE-TOKEN': token,
                'X-Requested-With': 'XMLHttpRequest',
            },
            params: {
                ref: branch,
                path: target,
                recursive: true,
                per_page: 5000
            }
        });
        //  其中tree为文件夹 需要剔除
        return data.filter((file) => file.type !== 'tree');
    });
}
exports.getBranchFileTree = getBranchFileTree;
//# sourceMappingURL=utils.js.map