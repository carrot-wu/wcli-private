import axios from 'axios';
import { getBranchFileTreeApi } from './api';

interface BranchFileTreeParams {
  git: string;
  repository: string;
  branch?: string;
  target?: string;
  token?: string;
}

interface BranchFileTreeRes {
  id: string;
  name: string;
  type: 'tree' | 'blob';
  path: string;
  mode: string;
}

/**
 * 获取分支文件结构
 * @param {BranchFileTreeParams} params
 * @returns {Promise<BranchFileTreeRes[]>}
 */
async function getBranchFileTree(params: BranchFileTreeParams): Promise<BranchFileTreeRes[]> {
  const { git, repository, token, branch = 'master', target } = params
  const url = getBranchFileTreeApi(git, repository)
  const { data } = await axios.get<BranchFileTreeRes[]>(url, {
    headers: {
      'PRIVATE-TOKEN': token,
      'X-Requested-With': 'XMLHttpRequest',
    },
    params: {
      ref: branch,
      path: target,
      recursive: true,
      per_page: 5000
    }
  })
  //  其中tree为文件夹 需要剔除
  return data.filter((file) => file.type !== 'tree')
}

export {
  getBranchFileTree
}
