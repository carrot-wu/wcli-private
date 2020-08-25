import { resolve } from 'path';
import { existsSync } from 'fs';
import { WCliConfigJson } from '@srcTypes/configJsonType';
import { getPluginCacheByName } from '@utils/pluginCache';
import throwHandleError from '../errorHandler/error';
import { isArray } from '../checktype';
import autoPackageJsonInstall from '../autoPackageJsonInstall';

/**
 * 获取文件名字
 * @param {string} filePath
 * @returns {string}
 */
const getFileNameByRegx = (filePath: string): string => {
  const fileNameArray: string[] | null = /(^|\/)[^/]+\.(json|js|ts|txt|md|css|html)$/.exec(filePath);
  return isArray(fileNameArray) ? fileNameArray[0].replace('/', '') : filePath;
};

/**
 * 查找wcli目录下是否有plugin插件
 * @param {string} pluginName
 * @returns {string}
 */
export function getPluginPathWithPluginName(pluginName: string): string {
  const localProjectPluginPath: string = resolve(__dirname, '../../../plugins', pluginName);
  return existsSync(localProjectPluginPath) ? localProjectPluginPath : null;
}

/**
 * 根据插件名称获取相应的文件
 * @param {WCliConfigJson} wcliConfigJson
 * @param {string} filePath 文件路径
 * @param {string} fileName 文件名字
 */
export function getPluginFileByName(wcliConfigJson: WCliConfigJson, filePath: string, fileName?: string): any {
  const execFileName = fileName || getFileNameByRegx(filePath);
  const { plugin: pluginName } = wcliConfigJson;
  let pluginPath = '';

  // 获取安装插件时的配置
  const { pluginType, pluginPath: cachePluginPath } = getPluginCacheByName(pluginName);

  switch (pluginType) {
    case 'git':
    case 'npm':
      // git 或者 npm形式的插件都是安装在wcli目录下的plugin目录下
      // 从本地wcliplugin文件plugin下查找
      if (getPluginPathWithPluginName(pluginName)) {
        pluginPath = getPluginPathWithPluginName(pluginName);
        // 查找到插件目录了 检查当前插件目录是否有package.json 有的话检查是否有node_modules目录 没有的话帮忙install
        autoPackageJsonInstall(pluginPath);
      } else {
        // 都找不到 提醒装插件
        throwHandleError(
          `请检查插件：${pluginName.bold}是否已安装，未安装可使用"${'wcli install plugin [plugin]'.bold}命令进行安装`,
        );
      }
      break;
    case 'local':
      // link的本地插件在缓存的pluginPath中找
      if (existsSync(cachePluginPath)) {
        pluginPath = cachePluginPath;
      } else {
        throwHandleError(`请检查插件：本地插件${pluginName.bold}目录地址是否已经更改`);
      }
      break;
    default:
      throwHandleError('指令错误');
  }

  const pluginFilePath = resolve(pluginPath, filePath);
  if (!existsSync(pluginFilePath)) {
    // 对应的文件不存在
    throwHandleError(`插件：${pluginName.bold}已安装，但是插件目录下缺少相应的${execFileName.bold}文件`);
  }
  // eslint-disable-next-line
  return require(pluginFilePath)
}
