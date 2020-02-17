export interface SshChoice {
  key: string;
  name: string;
  value: string;
}
const ADD_NEW_SSH = 'ADD_NEW_SSH'
const NOT_NEED_SSH = 'NOT_NEED_SSH'
const defaultSshConfigArray: SshChoice[] = [
  {
    key: ADD_NEW_SSH,
    name: '为该项目重新输入一个新的ssh',
    value: ADD_NEW_SSH
  },
  {
    key: NOT_NEED_SSH,
    name: '当前项目不需要设置ssh验证提交',
    value: NOT_NEED_SSH
  },
]
export {
  ADD_NEW_SSH,
  NOT_NEED_SSH,
  defaultSshConfigArray
}
