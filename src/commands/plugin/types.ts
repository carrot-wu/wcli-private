export type PluginCommand = "install" | "upgrade" | "remove" | "list" | "init" | "link"

// 插件类型 分为 1.npm下载的插件 2通过git下载的插件 3通过link命令本地指向的插件
type PluginType = 'npm' | 'git' | 'local'

export interface PluginCacheParams {
  //插件类型 分为 1.npm下载的插件 2通过git下载的插件 3通过link命令本地指向的插件
  pluginType: PluginType;
  // 插件名称
  pluginName: string;
  // 版本号
  version: string;
  // 安装插件时的额外参数
  args: string;
  // 插件地址
  pluginPath: string;
}

export type PluginCacheJson = {
  [key in string]: PluginCacheParams
}
