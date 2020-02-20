import { prompt } from 'inquirer'
import { writeJSON } from 'fs-extra';
import * as path from 'path'
import { WCliConfigJson } from '../../types/configJsonType'
import throwHandleError from '../../utils/errorHandler/error';
import { ADD_NEW_TOKEN, defaultSshConfigArray, NOT_NEED_TOKEN } from '../../constants/token';

// eslint-disable-next-line
const configJson = require(path.resolve(__dirname, '../../config.json'))

// 获取提交文件到github或者gitlab的
async function checkPublishGitToken(plugin: string): Promise<string> {
  // eslint-disable-next-line
  const pluginCacheSsh: { [k: string]: string } = configJson.pluginCacheSsh
  // 检查是否有token
  const pluginToken = pluginCacheSsh[plugin]
  // 有的话直接返回
  if (pluginToken) return pluginToken
  // 不存在 获取是否有其余的项目已经填写了token 需要把NOT_NEED_TOKEN不需要填写token的剔除
  const hasSshPluginArray: string[] = Object.keys(pluginCacheSsh).filter((pluginName) => pluginCacheSsh[pluginName] && pluginCacheSsh[pluginName] !== NOT_NEED_TOKEN)

  const hasPluginSshChoices = hasSshPluginArray.map((token) => ({ key: token, name: token, value: token }))
  const choices = hasPluginSshChoices.concat(...defaultSshConfigArray)
  const message: string = hasPluginSshChoices.length
    ? '初次发布私有项目需要使用发布仓库的token才能进行验证提交，您也可以选择使用其他插件的token进行提交'
    : '初次发布私有项目需要使用发布仓库的token才能进行验证提交'
  const promptSelectSsh = {
    type: 'list',
    message,
    name: 'token',
    choices
  }
  const { token } = await prompt([promptSelectSsh])
  if (token !== ADD_NEW_TOKEN) {
    // 使用之前插件的token
    return pluginCacheSsh[token]
  }

  // 不需要设置token 不需要验证 后续不提示填写token
  if (token === NOT_NEED_TOKEN) {
    return token
  }
  // 重新输入一个token
  const promptInputSsh = {
    type: 'input',
    message: '请输入发布仓库的token',
    name: 'newSsh',
    validate(val: string): boolean | string {
      const trimVal = val.replace(/(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g, '')
      if (trimVal) {
        return true
      }
      return 'token不能为空'
    },
    filter: (val: string): string => val.replace(/(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g, '')
  }
  const { newSsh } = await prompt([promptInputSsh])
  return newSsh
}

async function getPublishGitToken(wCliConfigJson: WCliConfigJson): Promise<string | undefined> {
  // eslint-disable-next-line
  const pluginCacheSsh: { [k: string]: string } = configJson.pluginCacheSsh

  const { plugin } = wCliConfigJson
  const token = await checkPublishGitToken(plugin)
  if (!pluginCacheSsh[plugin]) {
    // config.json没有token用户输入完之后保存到文件当中
    const configPath = path.resolve(__dirname, '../../config.json')
    const newConfigJson = {
      ...configJson,
      pluginCacheSsh: {
        ...configJson.pluginCacheSsh,
        [plugin]: token
      }
    }
    try {
      await writeJSON(configPath, newConfigJson)
    } catch (e) {
      throwHandleError('保存token失败')
    }
  }
  if (token !== NOT_NEED_TOKEN) return token
}

export {
  checkPublishGitToken,
  getPublishGitToken
}
