import { WCliConfigJson } from '@srcTypes/configJsonType';
import { currentWcliConfig } from '@utils/file';
import throwHandleError from '@utils/errorHandler/error';
import { formatWCliConfigJson } from '@utils/format';
import { getPluginFileByName } from '@utils/getPluginFile';
import { isFunction } from '@utils/checktype';
import { createPublishContext } from '@utils/createContext';

interface Options {
  debug?: boolean;
}

const PUBLISH_FILE = 'publish.js';
// 发布模式命令
const publishCommand = async (options: Options) => {
  const debug: boolean = options.debug || false;
  // 获取当前目录下的配置文件wcliconfig.json
  if (!currentWcliConfig) {
    throwHandleError('当前目录缺少wcliconfig.json文件');
  }
  // 获取配置
  const wcliConfigJson: WCliConfigJson = formatWCliConfigJson(currentWcliConfig);

  // 获取插件的publish.js文件
  const publishFile = getPluginFileByName(wcliConfigJson, PUBLISH_FILE);

  if (!isFunction(publishFile)) {
    throwHandleError(`${PUBLISH_FILE} is not the function`);
  }
  // // 获取发布仓库的token
  // const token = await getPublishGitToken(wcliConfigJson);
  // // 获取此次发布填写的commitMessage
  // const publishCommitMsg = await getCommitMessage();

  // 把一些通用上下文参数和方法注入
  return publishFile(
    createPublishContext({
      wcliConfigJson,
      debug,
    }),
  );
};

export default publishCommand;
