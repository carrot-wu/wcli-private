import * as gitUrlParse from 'git-url-parse';
import throwHandleError from '@utils/errorHandler/error';
import { success } from '@utils/log';
import { promisify } from 'util';
import { exec } from 'child_process';

interface GetDownloadGitRepoPathParams {
  pluginGitPath: string;
  projectName: string;
  branchName?: string;
}
const promisifyExec = promisify(exec);
/**
 * promise化下载git repo方法
 * @returns {Promise<string>}
 */
export async function downloadGitRepoPromise(path: string, downloadPath: string): Promise<string> {
  // url的下载 因为都是通过git clone 的形式拉取 直接pull就可以拉取到最新的文件
  const { stdout: gitStdout } = await promisifyExec(`git clone ${path} --depth=2`, {
    cwd: downloadPath,
  });
  success(gitStdout);
  return downloadPath;
  // return new Promise((resolveDownload, rejectDownload) => {
  //   download(path, downloadPath, { clone: true }, (error) => {
  //     if (error) {
  //       rejectDownload(error);
  //     } else {
  //       resolveDownload(downloadPath);
  //     }
  //   });
  // });
}

// 获取实际download-git-repo下载地址
export function getDownloadGitRepoPath(downloadGitParams: GetDownloadGitRepoPathParams): string {
  const { pluginGitPath, projectName, branchName } = downloadGitParams;
  const { git_suffix } = gitUrlParse(pluginGitPath);
  if (!git_suffix) {
    // 错误 不符合git地址
    throwHandleError('请检查git下载地址是否正确，安装地址目前只支持以.git为结尾的ssh地址或者http地址');
  }
  return branchName ? `${pluginGitPath} ${projectName} -b ${branchName}` : pluginGitPath;
}
// export function getDownloadGitRepoPath(pluginGitPath: string, branchName: string): string {
//   let downloadGitPath = pluginGitPath;
//   if (/github/.test(pluginGitPath)) {
//     // github项目 获取拥有者以及仓库名
//     const downloadGithubPathArray: PathArray = /github\.com[:/](.+)\.git$/.exec(pluginGitPath);
//     downloadGitPath = isArray(downloadGithubPathArray) ? downloadGithubPathArray[1] : pluginGitPath;
//     return `${downloadGitPath}#${branchName}`;
//   }
//
//   if (/gitlab/.test(pluginGitPath)) {
//     const proto = pluginGitPath.includes('https') ? 'https' : 'http';
//     const downloadGitLabPathArray: PathArray = /(?:git@|https?:\/\/)(.+)\.git$/.exec(pluginGitPath);
//     const downloadGitlabPath = isArray(downloadGitLabPathArray) ? downloadGitLabPathArray[1] : pluginGitPath;
//     // 没有包含：号的才需要做处理
//     if (!downloadGitPath.includes(':')) {
//       downloadGitPath = `${proto}://${downloadGitlabPath.replace(/(\.[^./]+)\//, '$1:')}`;
//     } else {
//       downloadGitPath = `${proto}://${downloadGitlabPath}`;
//     }
//     return `${downloadGitPath}#${branchName}`;
//   }
//   // 错误 不符合github或者gitlab
//   throwHandleError('请检查下载地址是否正确，安装地址目前只支持github和gitlab');
// }
