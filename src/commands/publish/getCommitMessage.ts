import { prompt } from 'enquirer';

/**
 * 获取填写的提交commit message
 * @returns {Promise<string>}
 */
export async function getCommitMessage(): Promise<string> {
  const promptInputMsg = {
    type: 'input',
    message: '请输入commit message',
    name: 'commitMsg',
    validate(val: string): boolean | string {
      const trimVal = val.replace(/(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g, '');
      if (trimVal) {
        return true;
      }
      return 'commit message不能为空';
    },
    filter: (val: string): string => val.replace(/(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g, ''),
  };

  const { commitMsg } = await prompt<{ commitMsg: string }>([promptInputMsg]);
  return commitMsg;
}
