"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ADD_NEW_TOKEN = 'ADD_NEW_TOKEN';
exports.ADD_NEW_TOKEN = ADD_NEW_TOKEN;
const NOT_NEED_TOKEN = 'NOT_NEED_TOKEN';
exports.NOT_NEED_TOKEN = NOT_NEED_TOKEN;
const defaultTokenConfigArray = [
    {
        key: ADD_NEW_TOKEN,
        name: '为该项目重新输入一个新的token',
        value: ADD_NEW_TOKEN
    },
    {
        key: NOT_NEED_TOKEN,
        name: '当前项目不需要设置token验证提交',
        value: NOT_NEED_TOKEN
    },
];
exports.defaultTokenConfigArray = defaultTokenConfigArray;
//# sourceMappingURL=token.js.map