import { resolve } from 'path';
import { existsSync } from 'fs';
import { execSync } from 'child_process';
import { currentWcliConfig } from '@utils/file';
import { loading, success, warn } from '../log';

/**
 * 检查path目录下是否有node_Modules和package.json
 * 没有的话帮忙install
 * @param {string} path
 */
export default function autoPackageJsonInstall(path: string): void {
  // 获取默认的安装插件命令 npm或者yarn
  const { package: packageType = 'npm' } = currentWcliConfig || {};
  const nodeModulesPath = resolve(path, 'node_modules');
  const packageJsonPath = resolve(path, 'package.json');
  // 没有package.json
  if (!existsSync(packageJsonPath)) {
    warn('查找不到对应的package.json文件，跳过依赖安装！');
    return;
  }
  // 存在package 不存在node_modules
  if (!existsSync(nodeModulesPath)) {
    loading('相关依赖安装中...');
    execSync(`${packageType} install`, { cwd: path, stdio: 'inherit' });
    success('依赖安装成功！');
  }
}
