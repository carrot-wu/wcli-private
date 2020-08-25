import { getCurrentBinFilePath } from '@utils/file';

const prettierNameArray = ['.prettierrc.json', '.prettierrc', '.prettierrc.js'];
export default async function initPrettier() {
  getCurrentBinFilePath();
}
