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
  type: string;
  path: string;
  mode: string;
}

/**
 * 获取分支树形文件结构
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
      path: target
    }
  })
  return data
}

export {
  getBranchFileTree
}
