import { resolve } from 'path'
import * as fse from 'fs-extra'
import { execSync } from 'child_process'
import { isArray } from '../../utils/checktype';
import { getPluginPathWithPluginName } from '../../utils/getPluginFile';
import throwHandleError from '../../utils/errorHandler/error';
import { loading, success } from '../../utils/log';
import autoPackageJsonInstall from '../../utils/autoPackageJsonInstall';

import download = require('download-git-repo');

// 根据git的地址获取实际的插件名字
function getPluginNameByPluginGitPath(pluginGitPath: string): string {
  const PluginNameArray: string[] | null = /\/([^/]+)\.git$/.exec(pluginGitPath)
  return isArray(PluginNameArray) ? PluginNameArray[1] : pluginGitPath
}

/**
 * promise化下载plugin方法
 * @param {string} path
 * @param {string} downloadPluginPath
 * @returns {Promise<string>}
 */
function downloadPluginByPath(path: string, downloadPluginPath: string): Promise<string> {
  return new Promise((resolveDownload, rejectDownload) => {
    download(path, downloadPluginPath, { clone: true }, (error) => {
      if (error) {
        rejectDownload(error)
      } else {
        resolveDownload(downloadPluginPath)
      }
    })
  })
}

// 获取实际download-git-repo下载地址
export function getDownloadGitRepoPath(pluginGitPath: string): string {
  if (/github/.test(pluginGitPath)) {
    // github项目 获取拥有者以及仓库名
    const downloadGithubPathArray: string[] | null = /github\.com[:/](.+)\.git$/.exec(pluginGitPath)
    return isArray(downloadGithubPathArray) ? downloadGithubPathArray[1] : pluginGitPath
  }

  if (/gitlab/.test(pluginGitPath)) {
    const downloadGitLabPathArray: string[] | null = /(?:git@|https:\/\/)(.+)\.git$/.exec(pluginGitPath)
    const downloadGitlabPath = isArray(downloadGitLabPathArray) ? downloadGitLabPathArray[1] : pluginGitPath
    return `gitlab:${downloadGitlabPath.replace('.com/', '.com:')}`
  }
  // 错误 不符合github或者gitlab
  throwHandleError('请检查插件地址是否正确，插件安装地址目前只支持[github]和[gitlab]')
}

/**
 * 根据git地址下载相应的插件
 * @param {string} pluginGitPath 插件地址
 * @returns {Promise<string>}
 */
export async function downloadPluginByGit(pluginGitPath: string): Promise<string> {
  // 获取插件名称
  const pluginName = getPluginNameByPluginGitPath(pluginGitPath)
  // 先检查插件是否已经安装了
  if (getPluginPathWithPluginName(pluginName)) {
    throwHandleError('插件已在plugin目录下存在，请勿重新安装')
  }
  const downloadPath = getDownloadGitRepoPath(pluginGitPath)
  // 未安装 安装插件
  loading(`下载插件[${pluginName}]中，请耐心等候...`)
  // 安装插件的地址
  const pluginsDirectionPath = resolve(__dirname, '../../../plugins')
  const downloadPluginPath = resolve(pluginsDirectionPath, pluginName)
  // 插件下载前先创建目录结构
  await fse.ensureDir(downloadPluginPath)
  try {
    await downloadPluginByPath(downloadPath, downloadPluginPath)
    success(`插件[${pluginName}]下载成功，正在安装插件所需依赖`)
    autoPackageJsonInstall(downloadPluginPath, 'yarn')
    success(`插件[${pluginName}]安装成功，你可以在项目中使用该插件！`)
    return downloadPluginPath
  } catch (e) {
    throwHandleError(e.message)
  }
}

// todo
export async function installPluginByNpm(npmName: string) {
  // 首先检测当前npm包是否存在
  try {
    execSync(`npm info ${npmName}`)
  } catch (e) {
    throwHandleError(`包${npmName.bold}不存在与npm registry中！`)
  }
  // 先检查插件是否已经安装了
  if (getPluginPathWithPluginName(npmName)) {
    throwHandleError('插件已在plugin目录下存在，请勿重新安装')
  }
  // 未安装 安装插件
  loading(`下载插件[${npmName}]中，请耐心等候...`)
  // 安装插件的地址
  const pluginsDirectionPath = resolve(__dirname, '../../../plugins')
  const downloadPluginPath = resolve(pluginsDirectionPath, npmName)
  // 插件下载前先创建目录结构
  await fse.ensureDir(downloadPluginPath)
  try {
    await downloadPluginByPath(downloadPath, downloadPluginPath)
    success(`插件[${pluginName}]下载成功，正在安装插件所需依赖`)
    autoPackageJsonInstall(downloadPluginPath, 'yarn')
    success(`插件[${pluginName}]安装成功，你可以在项目中使用该插件！`)
    return downloadPluginPath
  } catch (e) {
    throwHandleError(e.message)
  }
}
