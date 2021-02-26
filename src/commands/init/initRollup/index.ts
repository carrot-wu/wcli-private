import { prompt } from 'enquirer';
import * as fse from 'fs-extra';
import { downloadGitRepoPromise, getDownloadGitRepoPath } from '@utils/downloadGitRepo';
import { getCurrentBinFilePath, currentBinPath } from '@utils/file';
import throwHandleError from '@utils/errorHandler/error';
import { loading, success } from '@utils/log';
import { resolve } from 'path';
import { rollupTemplatePath } from './config';

const emptyReg = /(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g;

export default async function initRollup() {
  // 填写项目名称
  const promptInputPackageName = {
    type: 'input',
    message: '请输入要开发的新项目名称',
    name: 'packageName',
    validate(val: string): boolean | string {
      const trimVal = val.replace(emptyReg, '');
      if (trimVal) {
        return true;
      }
      return '项目名称不能为空';
    },
    filter: (val: string): string => val.replace(emptyReg, ''),
  };
  const { packageName } = await prompt<{ packageName: string }>([promptInputPackageName]);

  // 当前rollup创建项目路径
  const currentRollupPath = getCurrentBinFilePath(packageName);
  // 有同名文件夹了直接返回
  if (fse.existsSync(currentRollupPath)) {
    throwHandleError(`当前目录下存在同名文件夹${packageName}`);
  }
  // const getRollupDownloadPath = getDownloadGitRepoPath(rollupTemplatePath, 'main');
  const getRollupDownloadPath = getDownloadGitRepoPath({
    pluginGitPath: rollupTemplatePath,
    projectName: packageName,
    branchName: 'main',
  });
  loading('rollup模板创建中...');
  // 下载文件
  await downloadGitRepoPromise(getRollupDownloadPath, currentBinPath);

  const rollupPackagePath = resolve(currentRollupPath, './package.json');
  console.log(currentRollupPath);
  const defaultPackageJson = fse.readJsonSync(rollupPackagePath);
  fse.writeJsonSync(
    rollupPackagePath,
    {
      ...defaultPackageJson,
      name: packageName,
    },
    { spaces: 2 },
  );
  // 修改package-name变量
  success(`rollup模板【${packageName}】创建成功，具体author、description请自行在package.json配置`);
}
