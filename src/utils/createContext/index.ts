import { prompt, PromptModule } from 'inquirer'
import axios, { AxiosStatic } from 'axios'
import * as fse from 'fs-extra'
import { WCliConfigJson } from '../../types/configJsonType';
import { currentBinPath, getCurrentBinFilePath } from '../filePath';

// 传参给插件的context参数
interface ExtraParams {
  debug: boolean;
  wcliConfigJson: WCliConfigJson;
  publishSsh: string | boolean;
}

interface PublishContext {
  config: {
    isDebug: boolean;
    wcliConfigJson: WCliConfigJson;
    ssh: string | boolean;
  };
  paths: {
    currentBinPath: string;
  };
  utils: {
    getCurrentBinFilePath: (...paths: string[]) => string;
  };
  toolsModules: {
    prompt: PromptModule;
    axios: AxiosStatic;
    fse: typeof fse;
  };
}

export function createPublishContext(extarParam: ExtraParams): PublishContext {
  const { wcliConfigJson, debug, publishSsh } = extarParam
  return {
    config: {
      wcliConfigJson,
      isDebug: debug,
      ssh: publishSsh
    },
    paths: {
      currentBinPath
    },
    utils: {
      getCurrentBinFilePath
    },
    toolsModules: {
      prompt,
      axios,
      fse
    }
  }
}
