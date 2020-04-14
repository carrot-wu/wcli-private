import { isString } from "@utils/checktype";

export function trimString(str: string): string {
  if (isString(str)) {
    return str.replace(/^\s+|\s+$/g, '')
  }
}
