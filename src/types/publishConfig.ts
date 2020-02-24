export interface PublishConfig {
  // git地址
  git: string;
  // 仓库名
  repository: string;
  // 分支
  branch: string;
  // 替换的文件路径
  target: string;
  // 静态资源地址 默认是'dist'
  dist?: string;
  // 提交时的本地仓库路径 github的话必须提供 gitlab可以不用
  publishGitDir?: string;
}
