import * as path from 'path';
import * as fse from 'fs-extra'
import throwHandleError from '@utils/errorHandler/error';

interface CacheConfigJson {
  pluginCacheToken: {
    [k in string]: string
  };
}
// 缓存路径
const cacheConfigJsonPath = path.resolve(__dirname, '../../config.json')

function getTokenCacheConfig(): CacheConfigJson {
  if (fse.existsSync(cacheConfigJsonPath)) {
    // 存在直接返回
    // eslint-disable-next-line
    return require(cacheConfigJsonPath)
  }
  try {
    fse.outputJSONSync(cacheConfigJsonPath, { pluginCacheToken: {} })
    return fse.readJsonSync(cacheConfigJsonPath) as CacheConfigJson
  } catch (e) {
    throwHandleError('创建config.json失败')
  }
}

export default getTokenCacheConfig
