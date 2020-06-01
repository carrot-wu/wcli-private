// 根据路径引用相关文件
import {resolve} from "path";
import {existsSync, readJsonSync} from "fs-extra"
import {PluginCacheJson} from "@commands/plugin/types";
import {WCliConfigJson} from "@srcTypes/configJsonType";

const wcliSourcePath = resolve(__dirname, "../../../")
// wcli package。json
const packageJson = readJsonSync(resolve(wcliSourcePath, "package.json"))
// 当前执行命令所在目录
const currentBinPath: string = process.cwd()
// 当前插件安装所在目录绝对地址
const pluginsDirectionPath = resolve(wcliSourcePath, "plugins")
// plugins下的插件缓存json文件
const pluginCachePath = resolve(pluginsDirectionPath, "cache.json")


// 执行命令项目文件获取路径方法
const getCurrentBinFilePath = (...path: string[]): string => resolve(currentBinPath, ...path)

// 执行命令项目的wcliconfig.json路径
const currentWcliConfigPath = getCurrentBinFilePath("./wcliconfig.json")
// 执行命令项目的packagejson路径
const currentPackageJsonPath = getCurrentBinFilePath("./package.json")

// wcli 插件缓存json文件
// eslint-disable-next-line
const wcliPluginCacheJson: PluginCacheJson | null = existsSync(pluginCachePath) ? require(pluginCachePath) : null

// 执行命令项目wcliconfig.json
// eslint-disable-next-line
const currentWcliConfig: WCliConfigJson = existsSync(currentWcliConfigPath) ? require(currentWcliConfigPath) : null
// 执行命令项目packeage.json
// eslint-disable-next-line
const currentPackageJson = existsSync(currentPackageJsonPath) ? require(currentPackageJsonPath) : {}

export {
  wcliSourcePath,
  pluginsDirectionPath,
  pluginCachePath,
  currentBinPath,
  currentWcliConfig,
  currentPackageJson,
  packageJson,
  wcliPluginCacheJson,
  getCurrentBinFilePath
}
