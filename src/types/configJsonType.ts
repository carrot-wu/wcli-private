export interface WCliConfigJson {
  // 当前项目名
  name: string,
  // 项目使用过的包管理工具
  package?: 'npm' | 'yarn',
  // 打包的路径
  path?: {
    output?: string,
    public?: string
  },
  // 用到的插件名
  plugin: string,
  // dev模式开启的server
  devServer?: {
    // 端口号
    port?: number,
    // 是否开启http
    https?: boolean,
    // 代理配置
    proxy?: {[key in string] : string}
  },
  // publish模式的配置
  publish?: any
}
