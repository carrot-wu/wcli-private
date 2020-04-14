import { prompt } from "inquirer"
import { writeJSON } from "fs-extra";
import * as path from "path"
import { WCliConfigJson } from "@srcTypes/configJsonType"
import throwHandleError from "@utils/errorHandler/error";
import { ADD_NEW_TOKEN, defaultTokenConfigArray, NOT_NEED_TOKEN } from "@constants/token";
import getTokenCacheConfig from "./getPublishTokenConfigJson";

const configJson = getTokenCacheConfig()

// 获取提交文件到github或者gitlab的
async function checkPublishGitToken(plugin: string): Promise<string> {
  // eslint-disable-next-line
  const pluginCacheToken: { [k: string]: string } = configJson.pluginCacheToken
  // 检查是否有token
  const pluginToken = pluginCacheToken[plugin]
  // 有的话直接返回
  if (pluginToken) return pluginToken
  // 不存在 获取是否有其余的项目已经填写了token 需要把NOT_NEED_TOKEN不需要填写token的剔除
  const hasTokenPluginArray: string[] = Object.keys(pluginCacheToken).filter((pluginName) => pluginCacheToken[pluginName] && pluginCacheToken[pluginName] !== NOT_NEED_TOKEN)

  const hasPluginTokenChoices = hasTokenPluginArray.map((token) => ({ key: token, name: token, value: token }))
  const choices = hasPluginTokenChoices.concat(...defaultTokenConfigArray)
  const message: string = hasPluginTokenChoices.length
    ? "初次发布私有项目需要使用发布仓库的token才能进行验证提交，您也可以选择使用其他插件的token进行提交"
    : "初次发布私有项目需要使用发布仓库的token才能进行验证提交"
  const promptSelectToken = {
    type: "list",
    message,
    name: "token",
    choices
  }
  const { token } = await prompt([promptSelectToken])
  if (token !== ADD_NEW_TOKEN) {
    // 使用之前插件的token
    return pluginCacheToken[token]
  }

  // 不需要设置token 不需要验证 后续不提示填写token
  if (token === NOT_NEED_TOKEN) {
    return token
  }
  // 重新输入一个token
  const promptInputToken = {
    type: "input",
    message: "请输入发布仓库的token",
    name: "newToken",
    validate(val: string): boolean | string {
      const trimVal = val.replace(/(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g, "")
      if (trimVal) {
        return true
      }
      return "token不能为空"
    },
    filter: (val: string): string => val.replace(/(^[\s\uFEFF\xA0]+ | [\s\uFEFF\xA0]+$)/g, "")
  }
  const { newToken } = await prompt([promptInputToken])
  return newToken
}

async function getPublishGitToken(wCliConfigJson: WCliConfigJson): Promise<string | undefined> {
  // eslint-disable-next-line
  const pluginCacheToken: { [k: string]: string } = configJson.pluginCacheToken

  const { plugin } = wCliConfigJson
  const token = await checkPublishGitToken(plugin)
  if (!pluginCacheToken[plugin]) {
    // gitlabCache.json没有token用户输入完之后保存到文件当中
    const configPath = path.resolve(__dirname, "../../gitlabCache.json")
    const newConfigJson = {
      ...configJson,
      pluginCacheToken: {
        ...configJson.pluginCacheToken,
        [plugin]: token
      }
    }
    try {
      await writeJSON(configPath, newConfigJson)
    } catch (e) {
      throwHandleError("保存token失败")
    }
  }
  if (token !== NOT_NEED_TOKEN) return token
}

export {
  checkPublishGitToken,
  getPublishGitToken
}
