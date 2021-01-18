import { prompt } from 'enquirer';
import * as fse from 'fs-extra';
import { resolve } from 'path';
import { currentBinPath, templateDirectionPath } from '@utils/file';
import throwHandleError from '@utils/errorHandler/error';
import { loading, success } from '@utils/log';

export default async function createNewPlugin(): Promise<void> {
  const pluginTemplatePath = resolve(templateDirectionPath, 'defaultPluginTemplate');
  const promptInputMsg = {
    type: 'input',
    message: '请输入要开发的新插件名称',
    name: 'pluginName',
    validate(val: string): boolean | string {
      const trimVal = val.replace(/(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g, '');
      if (trimVal) {
        return true;
      }
      return '插件名称不能为空';
    },
    filter: (val: string): string => val.replace(/(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g, ''),
  };
  const { pluginName } = await prompt<{ pluginName: string }>([promptInputMsg]);
  const pluginDirName = resolve(currentBinPath, pluginName);
  if (fse.existsSync(pluginDirName)) {
    // 检查目录是否已创建
    throwHandleError(`当前插件目录${pluginName.bold}已存在与当前文件夹，请勿重复创建`);
  }
  loading('插件模板创建中...');
  // 创建目录
  await fse.ensureDir(pluginDirName);
  // 复制模板文件
  await fse.copy(pluginTemplatePath, pluginDirName);

  // 替换 packeage.json的name字段
  const pluginPackagePath = resolve(pluginDirName, './package.json');
  const defaultPackageJson = fse.readJsonSync(pluginPackagePath);
  fse.writeJsonSync(pluginPackagePath, {
    ...defaultPackageJson,
    name: pluginName,
  });
  success('插件模板创建成功...');
}
