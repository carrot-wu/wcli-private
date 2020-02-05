import {WCliConfigJson} from '../../types/configJsonType'
import { isPlainObject } from '../checktype'
import throwHandleError from '../errorHandler/error'
import { defaultWCliConfigJson } from '../../constants'

//初始化wcliconfig.json文件 不合法的话直接抛出错误
export function formatWCliConfigJson(wcliConfiJson: WCliConfigJson) {
  if(isPlainObject(wcliConfiJson) && wcliConfiJson.name && wcliConfiJson.plugin){
    return {
      ...defaultWCliConfigJson,
      ...wcliConfiJson
    }
  }else {
    throwHandleError('wcliconfig.json is not correct')
  }
}
