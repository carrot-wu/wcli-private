import * as updateNotifier from "update-notifier"
import { packageJson } from "@utils/file"

/**
 * 检查是否需要升级wcli
 */
export default function notifyUpdateWcli():void {
  updateNotifier({
    pkg: packageJson,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 7
  }).notify({
    isGlobal: true
  })
}
