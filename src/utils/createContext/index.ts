import { prompt, PromptModule } from 'inquirer'
import axios, { AxiosStatic } from 'axios'
import * as fse from 'fs-extra'
import { WCliConfigJson } from '../../types/configJsonType';
import { currentBinPath, getCurrentBinFilePath } from '../file';
import { publishFileWithCommit } from '../gitlab'

// 传参给插件的context参数
interface ExtraParams {
  debug: boolean;
  wcliConfigJson: WCliConfigJson;
  publishSsh?: string;
  publishCommitMsg: string;
}

interface PublishContext {
  config: {
    isDebug: boolean;
    wcliConfigJson: WCliConfigJson;
    token?: string;
    publishCommitMsg: string;
  };
  paths: {
    currentBinPath: string;
  };
  utils: {
    getCurrentBinFilePath: (...paths: string[]) => string;
    publishFileWithCommit: typeof publishFileWithCommit;
  };
  toolsModules: {
    prompt: PromptModule;
    axios: AxiosStatic;
    fse: typeof fse;
  };
}

export function createPublishContext(extarParam: ExtraParams): PublishContext {
  const { wcliConfigJson, debug, publishSsh, publishCommitMsg } = extarParam
  return {
    config: {
      wcliConfigJson,
      isDebug: debug,
      token: publishSsh,
      publishCommitMsg
    },
    paths: {
      currentBinPath
    },
    utils: {
      getCurrentBinFilePath,
      publishFileWithCommit
    },
    toolsModules: {
      prompt,
      axios,
      fse
    }
  }
}
