import * as ora from 'ora';

type InfoKey = 'success' | 'error' | 'info' | 'warn' | 'log';
type InfoColor = 'green' | 'red' | 'blue' | 'yellow' | 'white';
type InfoBgColor = 'bgGreen' | 'bgRed' | 'bgBlue' | 'bgYellow' | 'green' | 'red' | 'blue' | 'yellow' | 'white';
type InfoMap = {
  [K in InfoKey]: {
    text: string;
    color: InfoColor;
    bgColor: InfoBgColor;
  };
};
const infoMap: InfoMap = {
  success: {
    text: '√',
    color: 'green',
    bgColor: 'green',
  },
  error: {
    text: '×',
    color: 'red',
    bgColor: 'red',
  },
  info: {
    text: '✈',
    color: 'blue',
    bgColor: 'blue',
  },
  warn: {
    text: '！',
    color: 'yellow',
    bgColor: 'yellow',
  },
  log: {
    text: '',
    color: 'white',
    bgColor: 'white',
  },
};

// 初始化spinner
const SPINNER = ora({
  text: '加载中',
  color: 'yellow',
  spinner: 'bouncingBar',
});
function logWithColor(type: InfoKey): (text: string) => void {
  const { text: desc, color, bgColor } = infoMap[type];
  return function (text: string): void {
    const logText = `${desc}`[bgColor] + ` ${text}`[color];
    return console.log(logText);
  };
}
export const info = logWithColor('info');
export const warn = logWithColor('warn');
export const log = logWithColor('log');
export const originSuccess = logWithColor('success');
export const originError = logWithColor('error');

// loading的图标单独使用ora来出 有动效
export const loading = (text = '加载中') => {
  SPINNER.start(text.yellow);
};

// 搭配ora的success
export const success = (text = '成功!') => {
  if (SPINNER.isSpinning) {
    SPINNER.succeed(text.green);
  } else {
    originSuccess(text);
  }
};
// 搭配ora的error
export const error = (text = '失败') => {
  if (SPINNER.isSpinning) {
    SPINNER.fail(text.red);
  } else {
    originError(text);
  }
};
