import * as simpleGit from 'simple-git/promise';
import * as fse from 'fs-extra'
import * as path from 'path'
import { PublishConfig } from '@srcTypes/publishConfig';
import { getCurrentBinFilePath } from '@utils/file';
import throwHandleError from '@utils/errorHandler/error';
import * as log from '@utils/log';
import { publishFileWithGitlabCommit } from '../gitlab';
import { checkPathIsGitDir } from './utils';

interface PublishFileWithGitParams {
  publishConfig: PublishConfig;
  commitMsg: string;
}

const isGithubRepo = (git: string): boolean => /github.com/.test(git)

export default async function publishFileWithGit(publishParams: PublishFileWithGitParams): Promise<string | void> {
  const { publishConfig, commitMsg } = publishParams
  const { git, target, repository, publishGitDir, branch = 'master', dist = 'dist' } = publishConfig
  // 命令行执行的dist目录地址
  const binDistFilePath = getCurrentBinFilePath(dist)
  if (!publishGitDir) {
    // 如果是github的话那么提示填写本机仓库路径 不然的话调用gitlab方法
    return isGithubRepo(git) ? throwHandleError('github的发布需要填写本机发布git仓库的绝对路径') : publishFileWithGitlabCommit(publishParams)
  }
  // 检查当前路径是否git目录
  if (!checkPathIsGitDir(publishGitDir)) {
    throwHandleError(`路径：${publishGitDir}缺少.git目录`)
  }
  const publishGit = simpleGit(publishGitDir)
  // 检查当前目录是否有为暂存的文件
  const publishDirStatus = await publishGit.status()
  if (publishDirStatus.files.length > 0) {
    throwHandleError('当前发布仓库有任未发布的文件，请在执行publish前提前进行提交')
  }
  // 查看branch 远程分支是否存在
  const { all } = await publishGit.branch(['-r'])
  if (all.indexOf(`origin/${branch}`) === -1) {
    throwHandleError(`远程分支：${branch}不存在`)
  }
  // 切换分支并且进行更新
  await publishGit.checkout(branch)
  await publishGit.pull('origin', branch, { '--rebase': 'true' })
  // 先删除发布目录target下除了.git的文件夹
  const workDir = path.resolve(publishGitDir, target)
  const fileList = fse.readdirSync(workDir)
  const removePromiseArray = fileList.filter((fileName) => fileName !== '.git').map((fileName) => fse.remove(path.resolve(workDir, fileName)))
  // 进行删除
  await Promise.all(removePromiseArray)
  // copy dist文件到当前目录中
  await fse.copy(binDistFilePath, workDir)
  // 拷贝成功 进行add
  await publishGit.add('.')
  const changeFileStatus = await publishGit.status()
  if (changeFileStatus.files.length > 0) {
    // 生成commit进行提交
    await publishGit.commit(commitMsg)
    log.loading(`开始推送文件到远程仓库[${repository.bold}]`)
    await publishGit.push()
    log.success(`推送成功，代码已发布至分支${branch}`)
  } else {
    // 文件没有修改 直接提示退出
    log.info('当前项目代码已是最新，不用进行提交！')
  }
}
