export interface TokenChoice {
  key: string;
  name: string;
  value: string;
}
const ADD_NEW_TOKEN = 'ADD_NEW_TOKEN'
const NOT_NEED_TOKEN = 'NOT_NEED_TOKEN'
const defaultSshConfigArray: TokenChoice[] = [
  {
    key: ADD_NEW_TOKEN,
    name: '为该项目重新输入一个新的token',
    value: ADD_NEW_TOKEN
  },
  {
    key: NOT_NEED_TOKEN,
    name: '当前项目不需要设置token验证提交',
    value: NOT_NEED_TOKEN
  },
]
export {
  ADD_NEW_TOKEN,
  NOT_NEED_TOKEN,
  defaultSshConfigArray
}
