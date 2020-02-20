import * as path from 'path'
import * as fse from 'fs-extra'
import axios from 'axios'
import { getPublishCommitApi, getSingleBranch } from './api';
import { directorWalker } from '../file/directorWalker';
import { getCurrentBinFilePath } from '../file';
import { getBranchFileTree } from './utils';
import { checkIsTextFile } from '../file/checkFileIsText';
import * as log from '../log'

interface ProjectConfig {
  git: string;
  repository: string;
  branch: string;
  target: string;
  dist?: string;
}

interface GetCommitIdData {
  name: string;
  merged: boolean;
  protected: boolean;
  default: boolean;
  developers_can_push: boolean;
  developers_can_merge: boolean;
  can_push: boolean;
  commit: {
    author_email: string;
    author_name: string;
    authored_date: Date;
    committed_date: Date;
    committer_email: string;
    committer_name: string;
    id: string;
    short_id: string;
    title: string;
    message: string;
    parent_ids: string[];
  };
}

type ActionType = 'create' | 'delete' | 'move' | 'update' | 'chmod'

interface CommitAction {
  action: ActionType;
  file_path: string;
  previous_path?: string;
  content?: string;
  encoding?: 'text' | 'base64';
  last_commit_id?: string;
  execute_filemode?: boolean;
}

interface PublishFileWithCommitParams {
  projectConfig: ProjectConfig;
  commitMsg: string;
  token?: string;
}
interface PublishFileWithCommitRes {
  id: string;
  message: string;
  stats: {
    additions: number;
    deletions: number;
    total: number;
  };
}

// 获取分支最新commit
async function getLatestCommitId(projectConfig: ProjectConfig, token?: string) {
  const url = getSingleBranch(projectConfig)
  const { data } = await axios.get<GetCommitIdData>(url, {
    headers: {
      'PRIVATE-TOKEN': token,
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
  return data.commit.id
}

async function publishFileWithCommit(publishParams: PublishFileWithCommitParams) {
  const { projectConfig, commitMsg, token } = publishParams
  const { git, repository, target, branch = 'master', dist = 'dist' } = projectConfig
  // 命令行执行的dist目录地址
  const binDistFilePath = getCurrentBinFilePath(dist)
  // 获取commit api
  const commitUrl = getPublishCommitApi(git, repository)
  // 构建commit数组
  const actions: CommitAction[] = []
  // 先获取目标分支的树形结构
  const treeArray = await getBranchFileTree({ ...projectConfig, token })
  // 删除文件
  treeArray.forEach((file) => {
    actions.push({
      action: 'delete',
      file_path: file.path
    })
  })
  // 获取构建好的静态文件夹
  const distFileArray = await directorWalker(binDistFilePath)

  // 添加新生成的静态文件
  distFileArray.forEach((distPath) => {
    // 把绝对路径处理成相对路径
    const relativePath = path.relative(binDistFilePath, target)
    // eslint-disable-next-line no-useless-escape
    const filePath = path.join(target, relativePath)
    console.log(filePath)
    // 判断是文本还是二进制格式
    const isTextFile = checkIsTextFile(distPath)
    actions.push({
      action: 'create',
      file_path: filePath,
      content: fse.readFileSync(distPath, isTextFile ? 'utf8' : 'base64'),
      encoding: isTextFile ? 'text' : 'base64'
    })
  })
  // 开始提交commit
  const commit = {
    branch,
    commit_message: commitMsg,
    actions
  }
  // try {
  //   log.loading(`开始上传静态到远程仓库[${repository.bold}]`)
  //   const res = await axios.post<PublishFileWithCommitRes>(commitUrl, commit, {
  //     headers: {
  //       'PRIVATE-TOKEN': token,
  //       'X-Requested-With': 'XMLHttpRequest',
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   if (res && res.data && res.data.id) {
  //     log.success('上传成功')
  //     return res.data.id
  //   }
  //   log.error('上传失败')
  //   return Promise.reject(res.statusText)
  // } catch (e) {
  //   log.error('上传失败')
  //   throw e
  // }
}

export {
  getLatestCommitId,
  publishFileWithCommit
}
