import * as fse from 'fs-extra'
import { getPluginPathWithPluginName } from '../../../utils/getPluginFile';
import throwHandleError from '../../../utils/errorHandler/error';
import {loading, success} from '../../../utils/log';

const pluginRemove = (pluginName: string) => {
  const pluginPath = getPluginPathWithPluginName(pluginName)
  // 先查找当前plugin目下下是否有相应的插件目录
  if (!pluginPath) {
    throwHandleError(`wcli plugins目录下不存在${pluginName.bold}插件`)
  }
  // 删除插件
  loading(`插件${pluginName.bold}正在删除中`)
  fse.removeSync(pluginPath)
  success(`插件${pluginName.bold}删除成功！`)
}

export default pluginRemove
