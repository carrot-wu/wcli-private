import { prompt, PromptModule } from 'inquirer'
import axios, { AxiosStatic } from 'axios'
import * as fse from 'fs-extra'
import { WCliConfigJson } from '../../types/configJsonType';
import { currentBinPath, getCurrentBinFilePath } from '../file';
import { publishFileWithGitlabCommit } from '../../commands/publish/gitlab'
import publishFileWithGit from '../../commands/publish/publishWithGit';

// 传参给publish插件的context参数
interface PublishExtraParams {
  debug: boolean;
  wcliConfigJson: WCliConfigJson;
  publishToken?: string;
  publishCommitMsg: string;
}
// 传参给dev插件的context参数
type DevExtraParams = Omit<PublishExtraParams, 'publishToken' | 'publishCommitMsg'>

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
    publishFileWithGitlabCommit: typeof publishFileWithGitlabCommit;
    publishFileWithGit: typeof publishFileWithGit;
  };
  toolsModules: {
    prompt: PromptModule;
    axios: AxiosStatic;
    fse: typeof fse;
  };
}

interface DevContext {
  config: {
    isDebug: boolean;
    wcliConfigJson: WCliConfigJson;
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
export function createPublishContext(publishExtarParam: PublishExtraParams): PublishContext {
  const { wcliConfigJson, debug, publishToken, publishCommitMsg } = publishExtarParam
  return {
    config: {
      wcliConfigJson,
      isDebug: debug,
      token: publishToken,
      publishCommitMsg
    },
    paths: {
      currentBinPath
    },
    utils: {
      getCurrentBinFilePath,
      publishFileWithGitlabCommit,
      publishFileWithGit
    },
    toolsModules: {
      prompt,
      axios,
      fse
    }
  }
}

export function createDevContext(devExtarParam: DevExtraParams): DevContext {
  const { wcliConfigJson, debug } = devExtarParam
  return {
    config: {
      wcliConfigJson,
      isDebug: debug
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
