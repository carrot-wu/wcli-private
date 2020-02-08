import { prompt, PromptModule } from 'inquirer'
import { WCliConfigJson } from '../../types/configJsonType';
import { currentBinPath, getCurrentBinFilePath } from '../filePath';

interface ExtraParams {
  debug: boolean;
  wcliConfigJson: WCliConfigJson;
}

interface PublishContext {
  isDebug: boolean;
  wcliConfigJson: WCliConfigJson;
  paths: {
    currentBinPath: string;
  };
  utils: {
    getCurrentBinFilePath: (...paths: string[]) => string;
  };
  tools: {
    prompt: PromptModule;
  };
}
export function createPublishContext(extarParam: ExtraParams): PublishContext {
  const { wcliConfigJson, debug } = extarParam
  return {
    wcliConfigJson,
    isDebug: debug,
    paths: {
      currentBinPath
    },
    utils: {
      getCurrentBinFilePath
    },
    tools: {
      prompt
    }
  }
}
