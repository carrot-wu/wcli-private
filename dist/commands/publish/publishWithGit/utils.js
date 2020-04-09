"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fse = require("fs-extra");
const path_1 = require("path");
function checkPathIsGitDir(path) {
    const fileList = fse.readdirSync(path);
    const gitDir = fileList.find((item) => item === '.git');
    if (gitDir) {
        const fullPath = path_1.resolve(path, gitDir);
        const stats = fse.statSync(fullPath);
        return stats.isDirectory();
    }
    return false;
}
exports.checkPathIsGitDir = checkPathIsGitDir;
//# sourceMappingURL=utils.js.map