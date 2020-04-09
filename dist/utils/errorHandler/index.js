"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
const log = require("../log");
function errorHandler(next) {
    return function (...args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield next(...args);
            }
            catch (error) {
                const isSystemError = error instanceof error_1.SystemError;
                // 如果是自定义错误实例 那么就是已知错误
                if (isSystemError) {
                    const { message } = error;
                    log.error(message);
                    process.exit(1);
                }
                else {
                    // 未知错误
                    console.error(error);
                    process.exit(1);
                }
            }
        });
    };
}
exports.default = errorHandler;
//# sourceMappingURL=index.js.map