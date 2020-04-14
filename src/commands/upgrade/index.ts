// wcli升级
import { execSync } from "child_process"
import { wcliSourcePath } from "@utils/file";
import { loading, success } from "@utils/log";

interface Options {
  rebase?: boolean;
}
const upgradeCommand = (options: Options) => {
  const { rebase } = options
  const installShell = rebase ? "git pull --rebase" : "git pull"
  loading("wcli升级中...")
  execSync(installShell, { cwd: wcliSourcePath, stdio: "inherit" })
  success("wcli升级成功！")
}

export default upgradeCommand
