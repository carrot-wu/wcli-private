"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 获取最新分支的commit
 * @param {ProjectConfig} projectConfig
 * @returns {string}
 */
function getSingleBranch(projectConfig) {
    const { git, repository, branch } = projectConfig;
    return `${git}/api/v4/projects/${encodeURIComponent(repository)}/repository/branches/${branch || 'master'}`;
}
exports.getSingleBranch = getSingleBranch;
/**
 * 提交commit
 * @param {string} git
 * @param {string} repository
 * @returns {string}
 */
function getPublishCommitApi(git, repository) {
    return `${git}/api/v4/projects/${encodeURIComponent(repository)}/repository/commits`;
}
exports.getPublishCommitApi = getPublishCommitApi;
/**
 * 获取某个分支的树形文件架构
 * @param {string} git
 * @param {string} repository
 * @returns {string}
 */
function getBranchFileTreeApi(git, repository) {
    return `${git}/api/v4/projects/${encodeURIComponent(repository)}/repository/tree`;
}
exports.getBranchFileTreeApi = getBranchFileTreeApi;
//# sourceMappingURL=api.js.map