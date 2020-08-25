export interface TokenChoice {
  key: string;
  message: string;
  name: string;
}
const ADD_NEW_TOKEN = 'ADD_NEW_TOKEN';
const NOT_NEED_TOKEN = 'NOT_NEED_TOKEN';
const defaultTokenConfigArray: TokenChoice[] = [
  {
    key: ADD_NEW_TOKEN,
    message: '为该项目重新输入一个新的token',
    name: ADD_NEW_TOKEN,
  },
  {
    key: NOT_NEED_TOKEN,
    message: '当前项目不需要设置token验证提交',
    name: NOT_NEED_TOKEN,
  },
];
export { ADD_NEW_TOKEN, NOT_NEED_TOKEN, defaultTokenConfigArray };
