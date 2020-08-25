// wcli升级
import { execSync } from 'child_process';
import { wcliSourcePath, packageJson } from '@utils/file';
import { loading, success } from '@utils/log';

interface Options {
  yarn?: boolean;
}
const upgradeCommand = (options: Options) => {
  const { name } = packageJson;
  const { yarn } = options;
  const installShell = yarn ? `yarn global upgrade ${name}` : `npm update -g ${name}`;
  loading('wcli升级中...');
  execSync(installShell, { cwd: wcliSourcePath, stdio: 'inherit' });
  success('wcli升级成功！');
};

export default upgradeCommand;
