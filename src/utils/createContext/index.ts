import { prompt, PromptModule } from 'inquirer'
import axios, { AxiosStatic } from 'axios'
import * as fse from 'fs-extra'
import { WCliConfigJson } from '../../types/configJsonType';
import { currentBinPath, getCurrentBinFilePath } from '../file';
import { publishFileWithGitlabCommit } from '../../commands/publish/gitlab'
import publishFileWithGit from '../../commands/publish/publishWithGit';

// 传参给插件的context参数
interface ExtraParams {
  debug: boolean;
  wcliConfigJson: WCliConfigJson;
  publishToken?: string;
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
    publishFileWithGitlabCommit: typeof publishFileWithGitlabCommit;
    publishFileWithGit: typeof publishFileWithGit;
  };
  toolsModules: {
    prompt: PromptModule;
    axios: AxiosStatic;
    fse: typeof fse;
  };
}

export function createPublishContext(extarParam: ExtraParams): PublishContext {
  const { wcliConfigJson, debug, publishToken, publishCommitMsg } = extarParam
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
