import { prompt } from 'enquirer';
import * as fse from 'fs-extra';
import { resolve } from 'path';
import throwHandleError from '@utils/errorHandler/error';
import autoPackageJsonInstall from '@utils/autoPackageJsonInstall';
import { writePluginCache } from '@utils/pluginCache';
import { getPluginPathWithPluginName } from '@utils/getPluginFile';

// 用于本地插件进行开发的link指令 会把当前的插件目录指向提供的地址
export default async function linkPlugin() {
  // 提供本地插件的地址
  const promptInputMsg = {
    type: 'input',
    message: '请输入本地插件根目录的绝对路径',
    name: 'localPluginPath',
    validate(val: string): boolean | string {
      const trimVal = val.replace(/(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g, '');
      if (trimVal) {
        return true;
      }
      return '插件地址不能为空!';
    },
    filter: (val: string): string => val.replace(/(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g, ''),
  };
  const { localPluginPath } = await prompt<{ localPluginPath: string }>([promptInputMsg]);
  if (!fse.existsSync(localPluginPath)) {
    // 插件路径不存在
    throwHandleError('查找不到当前插件目录地址，请检查路径是否存在');
  }

  // 本地插件package.json地址 用于获取插件名字
  const localPluginPackagePath = resolve(localPluginPath, './package.json');
  // 检查package.json是否存在
  if (!fse.existsSync(localPluginPackagePath)) {
    // 插件路径不存在package.json
    throwHandleError('当前本地插件目录下不存在package.json文件');
  }

  // 通过package.json获取插件名
  const { name } = fse.readJsonSync(localPluginPackagePath);
  // 先检查插件是否已经安装了
  if (getPluginPathWithPluginName(name)) {
    throwHandleError('plugin目录下存在同名插件!');
  }
  // 写入缓存
  writePluginCache({
    pluginName: name,
    pluginType: 'local',
    args: localPluginPath,
    pluginPath: localPluginPath,
  });
  // 找到目录了 自动安装包
  autoPackageJsonInstall(localPluginPath);
}
