import * as path from 'path';
import { currentBinPath, currentWcliConfig } from '@utils/file';
import { warn, success } from '@utils/log';
import { prompt } from 'enquirer';
import * as fse from 'fs-extra';
import { defaultWCliConfigJson } from '@constants/index';
import throwHandleError from '@utils/errorHandler/error';

interface Choice {
  key: string;
  name: string;
  message: string;
}

const initChoices: Choice[] = [
  { key: 'yes', name: 'yes', message: 'yes' },
  { key: 'no', name: 'no', message: 'no' },
];

/**
 * 初始化一个新的wcliconfig.json文件
 */
export default async function initNewWcliConfigJson() {
  // 判断当前目录是否已存在wcliconfig.json文件
  if (currentWcliConfig) {
    warn('当前目录已存在wcliconfig.json文件');
    const promptSelect = {
      type: 'select',
      message: '是否重新初始化当前wcliconfi.json文件?',
      name: 'isReset',
      choices: initChoices,
    };
    const { isReset } = await prompt([promptSelect]);
    if (isReset === 'no') {
      // 直接退出
      return false;
    }
  }
  // 在当前目录重新初始化wcliconfig.json文件
  try {
    let newWcliConfigJson = defaultWCliConfigJson;
    if (currentWcliConfig) {
      const { name, plugin } = currentWcliConfig;
      newWcliConfigJson = {
        ...newWcliConfigJson,
        name,
        plugin,
      };
    }
    await fse.outputJson(path.resolve(currentBinPath, './wcliconfig.json'), newWcliConfigJson);
    success('初始化wcliconfi.json文件成功！您可以打开wcliconfig.json文件进行自定义配置');
  } catch (e) {
    throwHandleError('创建wcliconfig.json失败');
  }
}
