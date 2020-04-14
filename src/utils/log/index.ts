type InfoKey = "success" | "error" | "loading" | "info" |"warn" | "log"
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
  loading: {
    text: "loading",
    color: "yellow",
    bgColor: "bgYellow"
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

function logWithColor(type: InfoKey): ((text: string) => void) {
  const { text: desc, color, bgColor } = infoMap[type]
  return function (text: string): void {
    const logText = `[${desc}]`[bgColor] + ` ${text}`[color]
    return console.log(logText)
  }
}
export const success = logWithColor("success")
export const error = logWithColor("error")
export const loading = logWithColor("loading")
export const info = logWithColor("info")
export const warn = logWithColor("warn")
export const log = logWithColor("log")
