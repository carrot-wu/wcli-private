import * as ora from 'ora'
type InfoKey = "success" | "error"  | "info" |"warn" | "log"
type InfoColor = "green" | "red" | "blue" | "yellow" | "white"
type InfoBgColor = "bgGreen" | "bgRed" | "bgBlue" | "bgYellow"
type InfoMap = {
  [K in InfoKey]: {
    text: K;
    color: InfoColor;
    bgColor: InfoBgColor;
  }
}
const infoMap: InfoMap = {
  success: {
    text: "success",
    color: "green",
    bgColor: "bgGreen"
  },
  error: {
    text: "error",
    color: "red",
    bgColor: "bgRed"
  },
  info: {
    text: "info",
    color: "blue",
    bgColor: "bgBlue"
  },
  warn: {
    text: "warn",
    color: "yellow",
    bgColor: "bgYellow"
  },
  log: {
    text: "log",
    color: "white",
    bgColor: "bgGreen"
  },
}

// 初始化spinner
const SPINNER = ora({
  text: '加载中',
  color:'yellow',
  spinner: 'bouncingBar'
})
function logWithColor(type: InfoKey): ((text: string) => void) {
  const { text: desc, color, bgColor } = infoMap[type]
  return function (text: string): void {
    const logText = `${desc}`[bgColor] + ` ${text}`[color]
    return console.log(logText)
  }
}
export const info = logWithColor("info")
export const warn = logWithColor("warn")
export const log = logWithColor("log")
export const originSuccess = logWithColor("success")
export const originError = logWithColor("error")

// loading的图标单独使用ora来出 有动效
export const loading = (text: string) => {
  SPINNER.start(text.yellow)
}

// 搭配ora的success
export const success = (text: string) => {
  if(SPINNER.isSpinning){
    SPINNER.succeed(text.green)
  }else {
    originSuccess(text)
  }
}
// 搭配ora的error
export const error = (text: string) => {
  if(SPINNER.isSpinning){
    SPINNER.fail(text.red)
  }else {
    originError(text)
  }
}
