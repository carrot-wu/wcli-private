import { prompt, PromptModule } from 'inquirer'
import axios, { AxiosStatic } from 'axios'
import * as fse from 'fs-extra'
import { WCliConfigJson } from '@srcTypes/configJsonType';
import { publishFileWithGitlabCommit } from '@commands/publish/gitlab'
import publishFileWithGit from '@commands/publish/publishWithGit';
import * as logTools from '@utils/log'
import { currentBinPath, getCurrentBinFilePath } from '../file';

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
    logTools: typeof logTools;
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
    logTools: typeof logTools;
  };
  toolsModules: {
    prompt: PromptModule;
    axios: AxiosStatic;
    fse: typeof fse;
  };
}
export function createPublishContext(publishExtraParam: PublishExtraParams): PublishContext {
  const { wcliConfigJson, debug, publishToken, publishCommitMsg } = publishExtraParam
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
      publishFileWithGit,
      logTools
    },
    toolsModules: {
      prompt,
      axios,
      fse
    }
  }
}

export function createDevContext(devExtraParam: DevExtraParams): DevContext {
  const { wcliConfigJson, debug } = devExtraParam
  return {
    config: {
      wcliConfigJson,
      isDebug: debug
    },
    paths: {
      currentBinPath
    },
    utils: {
      getCurrentBinFilePath,
      logTools
    },
    toolsModules: {
      prompt,
      axios,
      fse
    }
  }
}

export function createBuildContext(buildExtraParam: DevExtraParams): DevContext {
  const { wcliConfigJson, debug } = buildExtraParam
  return {
    config: {
      wcliConfigJson,
      isDebug: debug
    },
    paths: {
      currentBinPath
    },
    utils: {
      getCurrentBinFilePath,
      logTools
    },
    toolsModules: {
      prompt,
      axios,
      fse
    }
  }
}
