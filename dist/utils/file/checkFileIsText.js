"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fse = require("fs-extra");
/**
 * 检测是否为普通文本文件
 * https://cnodejs.org/topic/57749d139ea5dce84ff27cbd
 *
 * @param {string} filePath
 * @param {number} length
 * @returns {boolean}
 */
const checkIsTextFile = (filePath, length = 1000) => {
    const fd = fse.openSync(filePath, 'r');
    for (let i = 0; i < length; i++) {
        const buf = Buffer.alloc(1);
        const bytes = fse.readSync(fd, buf, 0, 1, i);
        const char = buf.toString().charCodeAt(0);
        if (bytes === 0) {
            return true;
        }
        if (bytes === 1 && char === 0) {
            return false;
        }
    }
    return true;
};
exports.checkIsTextFile = checkIsTextFile;
//# sourceMappingURL=checkFileIsText.js.map