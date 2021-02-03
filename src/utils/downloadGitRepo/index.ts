import { isArray } from '@utils/checktype';
import throwHandleError from '@utils/errorHandler/error';

import download = require('download-git-repo');

type PathArray = string[] | null;

/**
 * promise化下载git repo方法
 * @returns {Promise<string>}
 */
export function downloadGitRepoPromise(path: string, downloadPath: string): Promise<string> {
  return new Promise((resolveDownload, rejectDownload) => {
    download(path, downloadPath, { clone: true }, (error) => {
      if (error) {
        rejectDownload(error);
      } else {
        resolveDownload(downloadPath);
      }
    });
  });
}

// 获取实际download-git-repo下载地址
export function getDownloadGitRepoPath(pluginGitPath: string, branchName: string): string {
  let downloadGitPath = pluginGitPath;
  if (/github/.test(pluginGitPath)) {
    // github项目 获取拥有者以及仓库名
    const downloadGithubPathArray: PathArray = /github\.com[:/](.+)\.git$/.exec(pluginGitPath);
    downloadGitPath = isArray(downloadGithubPathArray) ? downloadGithubPathArray[1] : pluginGitPath;
    return `${downloadGitPath}#${branchName}`;
  }

  if (/gitlab/.test(pluginGitPath)) {
    const proto = pluginGitPath.includes('https') ? 'https' : 'http';
    const downloadGitLabPathArray: PathArray = /(?:git@|https?:\/\/)(.+)\.git$/.exec(pluginGitPath);
    const downloadGitlabPath = isArray(downloadGitLabPathArray) ? downloadGitLabPathArray[1] : pluginGitPath;
    // 没有包含：号的才需要做处理
    if (!downloadGitPath.includes(':')) {
      downloadGitPath = `${proto}://${downloadGitlabPath.replace(/(\.[^./]+)\//, '$1:')}`;
    } else {
      downloadGitPath = `${proto}://${downloadGitlabPath}`;
    }
    return `${downloadGitPath}#${branchName}`;
  }
  // 错误 不符合github或者gitlab
  throwHandleError('请检查下载地址是否正确，安装地址目前只支持github和gitlab');
}
