import * as fse from 'fs-extra';
import { getPluginPathWithPluginName } from '@utils/getPluginFile';
import throwHandleError from '@utils/errorHandler/error';
import { PluginCacheJson } from '../types';

// 展示已安装的插件列表
export default function listPlugin(): void {
  // 获取缓存的json文件
  const pluginCachePath = getPluginPathWithPluginName('./cache.json');
  if (fse.existsSync(pluginCachePath)) {
    const pluginCacheJson: PluginCacheJson = fse.readJsonSync(pluginCachePath);
    const listArray = Object.values(pluginCacheJson).map(({ args, ...listObj }) => listObj);
    console.table(listArray);
    process.exit(1);
  } else {
    throwHandleError('暂无安装相应的插件列表');
  }
}
