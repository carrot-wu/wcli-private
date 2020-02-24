"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const infoMap = {
    success: {
        text: 'success',
        color: 'green',
        bgColor: 'bgGreen'
    },
    error: {
        text: 'error',
        color: 'red',
        bgColor: 'bgRed'
    },
    loading: {
        text: 'loading',
        color: 'yellow',
        bgColor: 'bgYellow'
    },
    info: {
        text: 'info',
        color: 'blue',
        bgColor: 'bgBlue'
    },
    warn: {
        text: 'warn',
        color: 'yellow',
        bgColor: 'bgYellow'
    },
};
function logWithColor(type) {
    const { text: desc, color, bgColor } = infoMap[type];
    return function (text) {
        const logText = `[${desc}]`[bgColor] + ` ${text}`[color];
        return console.log(logText);
    };
}
exports.success = logWithColor('success');
exports.error = logWithColor('error');
exports.loading = logWithColor('loading');
exports.info = logWithColor('info');
exports.warn = logWithColor('warn');
//# sourceMappingURL=index.js.map