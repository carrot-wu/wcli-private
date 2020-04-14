import { SystemError } from "./error"
import * as log from "../log"

export default function errorHandler(next: (...args: any[]) => any) {
  return async function (...args: any[]): Promise<void> {
    try {
      await next(...args)
    } catch (error) {
      const isSystemError: boolean = error instanceof SystemError
      // 如果是自定义错误实例 那么就是已知错误
      if (isSystemError) {
        const { message } = error
        log.error(message)
        process.exit(1)
      } else {
        // 未知错误
        console.error(error)
        process.exit(1)
      }
    }
  }
}
