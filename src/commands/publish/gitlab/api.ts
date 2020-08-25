interface GetSingleBranch {
  git: string;
  repository: string;
  branch?: string;
}

/**
 * 获取最新分支的commit
 * @param {ProjectConfig} projectConfig
 * @returns {string}
 */
function getSingleBranch(projectConfig: GetSingleBranch): string {
  const { git, repository, branch } = projectConfig;
  return `${git}/api/v4/projects/${encodeURIComponent(repository)}/repository/branches/${branch || 'master'}`;
}

/**
 * 提交commit
 * @param {string} git
 * @param {string} repository
 * @returns {string}
 */
function getPublishCommitApi(git: string, repository: string): string {
  return `${git}/api/v4/projects/${encodeURIComponent(repository)}/repository/commits`;
}

/**
 * 获取某个分支的树形文件架构
 * @param {string} git
 * @param {string} repository
 * @returns {string}
 */
function getBranchFileTreeApi(git: string, repository: string): string {
  return `${git}/api/v4/projects/${encodeURIComponent(repository)}/repository/tree`;
}

export { getSingleBranch, getPublishCommitApi, getBranchFileTreeApi };
