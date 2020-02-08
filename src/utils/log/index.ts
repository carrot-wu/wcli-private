type InfoKey = 'success' | 'error' | 'loading' | 'info' |'warn'
type InfoColor = 'green' | 'red' | 'blue' | 'yellow'
type InfoMap = {
  [K in InfoKey]: {text: K; color: InfoColor}
}
const infoMap: InfoMap = {
  success: {
    text: 'success',
    color: 'green'
  },
  error: {
    text: 'error',
    color: 'red'
  },
  loading: {
    text: 'loading',
    color: 'blue'
  },
  info: {
    text: 'info',
    color: 'yellow'
  },
  warn: {
    text: 'warn',
    color: 'yellow'
  },
}

function logWithColor(type: InfoKey): ((text: string) => void) {
  const { text: desc, color } = infoMap[type]
  return function (text: string): void {
    const logText = `[${desc}] ${text}`[color]
    return console.log(logText)
  }
}
export const success = logWithColor('success')
export const error = logWithColor('error')
export const loading = logWithColor('loading')
export const info = logWithColor('info')
export const warn = logWithColor('warn')
