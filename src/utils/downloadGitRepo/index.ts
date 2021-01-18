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
export function getDownloadGitRepoPath(pluginGitPath: string): string {
  if (/github/.test(pluginGitPath)) {
    // github项目 获取拥有者以及仓库名
    const downloadGithubPathArray: PathArray = /github\.com[:/](.+)\.git$/.exec(pluginGitPath);
    return isArray(downloadGithubPathArray) ? downloadGithubPathArray[1] : pluginGitPath;
  }

  if (/gitlab/.test(pluginGitPath)) {
    const downloadGitLabPathArray: PathArray = /(?:git@|https:\/\/)(.+)\.git$/.exec(pluginGitPath);
    const downloadGitlabPath = isArray(downloadGitLabPathArray) ? downloadGitLabPathArray[1] : pluginGitPath;
    return `https://${downloadGitlabPath.replace('.com/', '.com:')}`;
  }
  // 错误 不符合github或者gitlab
  throwHandleError('请检查下载地址是否正确，安装地址目前只支持github和gitlab');
}
