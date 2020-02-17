import { prompt } from 'inquirer'
import { writeJSON } from 'fs-extra';
import * as path from 'path'
import { WCliConfigJson } from '../../types/configJsonType'
import * as configJson from '../../config.json'
import throwHandleError from '../../utils/errorHandler/error';
import { ADD_NEW_SSH, defaultSshConfigArray, NOT_NEED_SSH } from '../../constants/ssh';


// 获取提交文件到github或者gitlab的
async function checkPublishGitssh(plugin: string): Promise<string> {
  // eslint-disable-next-line
  const pluginCacheSsh: { [k: string]: string } = configJson.pluginCacheSsh
  // 检查是否有token
  const pluginToken = pluginCacheSsh[plugin]
  // 有的话直接返回
  if (pluginToken) return pluginToken
  // 不存在 获取是否有其余的项目已经填写了ssh 需要把NOT_NEED_SSH不需要填写ssh的剔除
  const hasSshPluginArray: string[] = Object.keys(pluginCacheSsh).filter((pluginName) => pluginCacheSsh[pluginName] && pluginCacheSsh[pluginName] !== NOT_NEED_SSH)

  const hasPluginSshChoices = hasSshPluginArray.map((ssh) => ({ key: ssh, name: ssh, value: ssh }))
  const choices = hasPluginSshChoices.concat(...defaultSshConfigArray)
  const message: string = hasPluginSshChoices.length
    ? '初次发布私有项目需要使用发布仓库的ssh才能进行验证提交，您也可以选择使用其他插件的ssh进行提交'
    : '初次发布私有项目需要使用发布仓库的ssh才能进行验证提交'
  const promptSelectSsh = {
    type: 'list',
    message,
    name: 'ssh',
    choices
  }
  const { ssh } = await prompt([promptSelectSsh])
  if (ssh !== ADD_NEW_SSH) {
    // 使用之前插件的ssh
    return pluginCacheSsh[ssh]
  }

  // 不需要设置ssh 不需要验证 后续不提示填写ssh
  if (ssh === NOT_NEED_SSH) {
    return ssh
  }
  // 重新输入一个ssh
  const promptInputSsh = {
    type: 'input',
    message: '请输入发布仓库的ssh',
    name: 'newSsh',
    validate(val: string): boolean | string {
      const trimVal = val.replace(/(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g, '')
      if (trimVal) {
        return true
      }
      return 'ssh不能为空'
    },
    filter: (val: string): string => val.replace(/(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g, '')
  }
  const { newSsh } = await prompt([promptInputSsh])
  return newSsh
}

async function getPublishGitssh(wCliConfigJson: WCliConfigJson): Promise<string | boolean> {
  // eslint-disable-next-line
  const pluginCacheSsh: { [k: string]: string } = configJson.pluginCacheSsh

  const { plugin } = wCliConfigJson
  const ssh = await checkPublishGitssh(plugin)
  if (!pluginCacheSsh[plugin]) {
    // config.json没有ssh用户输入完之后保存到文件当中
    const configPath = path.resolve(__dirname, '../../config.json')
    const newConfigJson = {
      ...configJson,
      pluginCacheSsh: {
        ...configJson.pluginCacheSsh,
        [plugin]: ssh
      }
    }
    try {
      await writeJSON(configPath, newConfigJson)
    } catch (e) {
      throwHandleError('保存ssh失败')
    }
  }
  // 如果不需要ssh直接返回false
  return ssh === NOT_NEED_SSH ? false : ssh
}

export {
  checkPublishGitssh,
  getPublishGitssh
}
