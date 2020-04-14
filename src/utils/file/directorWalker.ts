import * as fse from "fs-extra"

function fileWalker(path: string, fileList: string[]): void {
  // 文件就直接把路径塞进去
  if (fse.statSync(path).isFile()) {
    fileList.push(path)
    return
  }
  // 不是的话继续递归
  fse.readdirSync(path).forEach((file) => {
    fileWalker(`${path}/${file}`, fileList)
  })
}


export function directorWalker(path: string): Promise<string[]> {
  const fileList: string[] = []
  if (fse.statSync(path).isFile()) {
    // 已经是文件了
    fileList.push(path)
    return Promise.resolve(fileList)
  }
  return new Promise((resolve, reject) => {
    try {
      fileWalker(path, fileList)
      resolve(fileList)
    } catch (e) {
      reject(e)
    }
  })
}
