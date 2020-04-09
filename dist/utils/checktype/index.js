"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeToString = Object.prototype.toString;
const checkType = (type) => (val) => (typeToString
    .call(val)
    .slice(8, -1)
    .toLowerCase() === type.toLowerCase());
const isNumber = checkType('number');
exports.isNumber = isNumber;
const isArray = checkType('array');
exports.isArray = isArray;
const isBoolean = checkType('boolean');
exports.isBoolean = isBoolean;
const isPlainObject = checkType('object');
exports.isPlainObject = isPlainObject;
const isAsyncFunction = checkType('asyncFunction');
exports.isAsyncFunction = isAsyncFunction;
const isPromise = checkType('promise');
exports.isPromise = isPromise;
const isUndefined = checkType('undefined');
exports.isUndefined = isUndefined;
const isString = checkType('string');
exports.isString = isString;
const isSymbol = checkType('symbol');
exports.isSymbol = isSymbol;
const isDate = checkType('date');
exports.isDate = isDate;
const isError = checkType('error');
exports.isError = isError;
const isFunction = (val) => typeof val === 'function';
exports.isFunction = isFunction;
//# sourceMappingURL=index.js.map