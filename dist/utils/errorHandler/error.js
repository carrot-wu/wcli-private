"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SystemError extends Error {
    constructor(config) {
        const { code = 999, msg } = config;
        super(msg);
        this.code = code;
        Object.setPrototypeOf(this, SystemError.prototype);
    }
}
exports.SystemError = SystemError;
function throwHandleError(msg, code) {
    throw new SystemError({ msg, code });
}
exports.default = throwHandleError;
//# sourceMappingURL=error.js.map