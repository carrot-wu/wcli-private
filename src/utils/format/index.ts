import { WCliConfigJson } from '@srcTypes/configJsonType';
import { defaultWCliConfigJson } from '@constants/index';
import { isPlainObject } from '../checktype';
import throwHandleError from '../errorHandler/error';

// 初始化wcliconfig.json文件 不合法的话直接抛出错误
// eslint-disable-next-line consistent-return
export function formatWCliConfigJson(wcliConfiJson: WCliConfigJson) {
  if (isPlainObject(wcliConfiJson) && wcliConfiJson.name && wcliConfiJson.plugin) {
    return {
      ...defaultWCliConfigJson,
      ...wcliConfiJson,
    };
  }
  throwHandleError('wcliconfig.json不合法，请检查是否缺少name或者plugin属性');
}
