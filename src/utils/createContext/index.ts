import { prompt } from 'enquirer';
import axios, { AxiosStatic } from 'axios';
import * as fse from 'fs-extra';
import * as simpleGit from 'simple-git';
import { WCliConfigJson } from '@srcTypes/configJsonType';
import { getCommitMessage, publishFileWithGitlabCommit } from '@commands/publish/gitlab';
import publishFileWithGit from '@commands/publish/publishWithGit';
import * as logTools from '@utils/log';
import throwHandleError from '@utils/errorHandler/error';
import { currentBinPath, getCurrentBinFilePath } from '../file';

// 传参给publish插件的context参数
interface PublishExtraParams {
  debug?: boolean;
  wcliConfigJson: WCliConfigJson;
}
// 传参给dev插件的context参数
type DevExtraParams = Omit<PublishExtraParams, 'publishToken' | 'publishCommitMsg'>;

interface CustomExtraParams extends DevExtraParams {
  extraArgArray: string[];
}
interface PublishContext {
  config: {
    isDebug: boolean;
    wcliConfigJson: WCliConfigJson;
  };
  paths: {
    currentBinPath: string;
  };
  utils: {
    getCurrentBinFilePath: (...paths: string[]) => string;
    publishFileWithGitlabCommit: typeof publishFileWithGitlabCommit;
    publishFileWithGit: typeof publishFileWithGit;
    logTools: typeof logTools;
    throwHandleError: typeof throwHandleError;
    getCommitMessage: typeof getCommitMessage;
  };
  toolsModules: {
    prompt: typeof prompt;
    axios: AxiosStatic;
    fse: typeof fse;
    simpleGit: typeof simpleGit;
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
    throwHandleError: typeof throwHandleError;
  };
  toolsModules: {
    prompt: typeof prompt;
    axios: AxiosStatic;
    fse: typeof fse;
  };
}

interface CustomContext {
  config: {
    isDebug: boolean;
    wcliConfigJson: WCliConfigJson;
    extraArgArray: string[];
  };
  paths: {
    currentBinPath: string;
  };
  utils: {
    getCurrentBinFilePath: (...paths: string[]) => string;
    logTools: typeof logTools;
    throwHandleError: typeof throwHandleError;
  };
  toolsModules: {
    prompt: typeof prompt;
    axios: AxiosStatic;
    fse: typeof fse;
  };
}
/**
 * publish命令下往publish.js注入的依赖对象
 * @param {PublishExtraParams} publishExtraParam
 * @returns {PublishContext}
 */
export function createPublishContext(publishExtraParam: PublishExtraParams): PublishContext {
  const { wcliConfigJson, debug } = publishExtraParam;
  return {
    config: {
      wcliConfigJson,
      isDebug: debug,
    },
    paths: {
      currentBinPath,
    },
    utils: {
      getCurrentBinFilePath,
      publishFileWithGitlabCommit,
      publishFileWithGit,
      logTools,
      throwHandleError,
      getCommitMessage,
    },
    toolsModules: {
      prompt,
      axios,
      fse,
      simpleGit,
    },
  };
}

/**
 * dev命令下往dev.js注入的依赖对象
 * @param {DevExtraParams} devExtraParam
 * @returns {DevContext}
 */
export function createDevContext(devExtraParam: DevExtraParams): DevContext {
  const { wcliConfigJson, debug = false } = devExtraParam;
  return {
    config: {
      wcliConfigJson,
      isDebug: debug,
    },
    paths: {
      currentBinPath,
    },
    utils: {
      getCurrentBinFilePath,
      logTools,
      throwHandleError,
    },
    toolsModules: {
      prompt,
      axios,
      fse,
    },
  };
}

/**
 * build命令下往build.js注入的依赖对象
 * @param {DevExtraParams} buildExtraParam
 * @returns {DevContext}
 */
export function createBuildContext(buildExtraParam: DevExtraParams): DevContext {
  const { wcliConfigJson, debug } = buildExtraParam;
  return {
    config: {
      wcliConfigJson,
      isDebug: debug,
    },
    paths: {
      currentBinPath,
    },
    utils: {
      getCurrentBinFilePath,
      logTools,
      throwHandleError,
    },
    toolsModules: {
      prompt,
      axios,
      fse,
    },
  };
}

/**
 * custom命令下往custom.js注入的依赖对象
 * @param customExtraParam
 */
export function createCustomContext(customExtraParam: CustomExtraParams): CustomContext {
  const { wcliConfigJson, debug = false, extraArgArray } = customExtraParam;
  return {
    config: {
      wcliConfigJson,
      isDebug: debug,
      extraArgArray,
    },
    paths: {
      currentBinPath,
    },
    utils: {
      getCurrentBinFilePath,
      logTools,
      throwHandleError,
    },
    toolsModules: {
      prompt,
      axios,
      fse,
    },
  };
}
