const gitUrlParse = require('git-url-parse');

const a = gitUrlParse('name@gitlab.ruqimobility.local:frontend/testMaster.git');

const b = gitUrlParse('http://gitlab.ruqimobility.local/frontend/testMaster.git');

const c = gitUrlParse('http://gitlab.ruqimobility.local/frontend/testMaster');
b.protocol = 'ssh';
const d = gitUrlParse.stringify(b);

console.log(a, b, c);
