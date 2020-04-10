import { normalize, resolve } from 'path';
import * as fse from 'fs-extra';
import { wcliSourcePath } from '@utils/file';
import { PluginCacheJson } from '../../types';

interface WritePluginCacheParams {
  isNpm: boolean;
  pluginName: string;
  pluginPath: string;
  args: string;
}
// 插件插件完成时保存相对应的缓存
export function writePluginCache(params: WritePluginCacheParams): void {
  const { pluginName, pluginPath } = params
  // 获取缓存的json文件
  const pluginCachePath = resolve(wcliSourcePath, './plugins/cache.json')
  const { version } = fse.readJsonSync(resolve(pluginPath, './package.json'))
  // 获取插件的版本号
  let writeCacheObj: PluginCacheJson = {
    [pluginName]: {
      ...params,
      pluginPath: normalize(pluginPath).replace(/\\/g, '/'),
      version
    }
  }
  if (fse.existsSync(pluginCachePath)) {
    const oldPluginCacheJson: PluginCacheJson = fse.readJsonSync(pluginCachePath)
    writeCacheObj = {
      ...oldPluginCacheJson,
      ...writeCacheObj
    }
  } else {
    fse.ensureFileSync(pluginCachePath)
  }
  fse.writeJSONSync(pluginCachePath, writeCacheObj)
}

// 获取插件缓存
export function getPluginCacheByName(pluginName: string) {
  // todo
}
