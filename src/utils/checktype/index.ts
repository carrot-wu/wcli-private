// 检查类型的策略模式
type TypeChecker = {
  number: number;
  boolean: boolean;
  array: Array<any>;
  object: object;
  function: (...args: any[]) => any;
  string: string;
  null: null;
  undefined: undefined;
  symbol: symbol;
  date: Date;
  error: Error;
};
const { toString: typeToString } = Object.prototype.toString;
const checkType = <U extends keyof TypeChecker>(type: U) => (val: unknown): val is TypeChecker[U] => (
  typeToString
    .call(val)
    .slice(8, -1)
    .toLowerCase() === type
)

const isNumber = checkType('number');
const isArray = checkType('array');
const isBoolean = checkType('boolean');
const isPlainObject = checkType('object');
const isFunction = checkType('function');
const isUndefined = checkType('undefined');
const isString = checkType('string');
const isSymbol = checkType('symbol');
const isDate = checkType('date');
const isError = checkType('error');

export {
  isNumber,
  isArray,
  isBoolean,
  isPlainObject,
  isFunction,
  isUndefined,
  isString,
  isSymbol,
  isDate,
  isError
}
