import { normalize, resolve } from 'path';
import * as fse from 'fs-extra';
import { pluginCachePath, wcliPluginCacheJson } from '@utils/file';
import throwHandleError from '@utils/errorHandler/error';
import { PluginCacheJson, PluginCacheParams } from '@commands/plugin/types';

type WritePluginCacheParams = Omit<PluginCacheParams, 'version'>;

// 插件插件完成时保存相对应的缓存
export function writePluginCache(params: WritePluginCacheParams): void {
  const { pluginName, pluginPath } = params;
  const packageJsonPath = resolve(pluginPath, './package.json');
  let version = '1.0.0';
  // 获取缓存的json文件
  if (fse.existsSync(packageJsonPath)) {
    const { version: pluginVersion } = fse.readJsonSync(packageJsonPath);
    version = pluginVersion;
  }
  // 获取插件的版本号
  let writeCacheObj: PluginCacheJson = {
    [pluginName]: {
      ...params,
      pluginPath: normalize(pluginPath).replace(/\\/g, '/'),
      version,
    },
  };
  // 写入新的插件缓存
  if (wcliPluginCacheJson) {
    writeCacheObj = {
      ...wcliPluginCacheJson,
      ...writeCacheObj,
    };
  } else {
    // 没有的话 创建
    fse.ensureFileSync(pluginCachePath);
  }
  fse.writeJSONSync(pluginCachePath, writeCacheObj);
}

// 获取插件缓存
export function getPluginCacheByName(pluginName: string) {
  // 获取缓存的json文件
  if (!fse.existsSync(pluginCachePath)) {
    throwHandleError('找不到插件缓存文件cache.json，请重新安装插件！');
  }
  const pluginCacheJson: PluginCacheJson = fse.readJsonSync(pluginCachePath);
  if (!pluginCacheJson[pluginName]) {
    // 找不到插件名
    throwHandleError(`查找不到插件${pluginName},请检查插件是否已安装`);
  }
  return pluginCacheJson[pluginName];
}
