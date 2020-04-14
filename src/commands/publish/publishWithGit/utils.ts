import * as fse from "fs-extra"
import { resolve } from "path"

export function checkPathIsGitDir(path: string): boolean {
  const fileList = fse.readdirSync(path);
  const gitDir = fileList.find((item) => item === ".git");
  if (gitDir) {
    const fullPath = resolve(path, gitDir);
    const stats = fse.statSync(fullPath);
    return stats.isDirectory();
  }
  return false;
}
