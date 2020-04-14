# wcli
[![NPM Version][npm-image]][npm-url]

一个通过插件化的形式支持自定义开发打包推送的全局cli工具

## 安装

```
npm install @carrotwu/wcli --global
or
yarn global add @carrotwu/wcli
```

## 使用

1. 请先确保项目根目录已经有wcliconfig.json文件，wcli命令的执行依托于该配置。
2. 通过`wcli plugin install XXX`安装相应的plugin插件。
3. 执行wcli提供的`dev`,`publish`,`build`等指令。

## plugin指令

### wcli plugin install

插件的安装支持两种方式，一种是github或者gitlab的ur地址，一种是通过npm包名的形式进行安装。插件会自动安装在项目根目录的plugins目录下，插件安装完成之后会自动执行install 命令
```
// 通过npm的方式安装插件
wcli plugin install XXX-plugin -n

// 通过github或者gitlab的url地址安装插件
wcli plugin install https://github.com/mrmrs/colors

```

### wcli plugin init

当你需要编写一个插件时，可以通过`wcli plugin init`初始化一个插件目录模板。插件目录下会默认初始化四个文件。

1. **dev.js**: 执行`wcli dev`命令时执行的文件。
2. **build.js**: 执行`wcli build`命令时执行的文件。
3. **publish.js**: 执行`wcli publish`命令时执行的文件。
4. **package.json**: 初始化的插件package.json文件。

对于前三个文件的导出函数，会把一些可能使用到的参数变量或者wcli提供的一些通用方法通过context参数注入。具体context类型定义如下：

```ts
interface Context {
  config: {
    // 是否处于debug模式
    isDebug: boolean;
    // 项目根目录下的wcliconfig.json文件
    wcliConfigJson: WCliConfigJson;
    // 初始化publish命令时 用户所填的推送项目ssh token
    token?: string;
    // publish命令时 用户输入的commitMessage
    publishCommitMsg: string;
  };
  paths: {
      // 当前用户执行wcli命令的路径
    currentBinPath: string;
  };
  utils: {
      // 获取项目目录文件的通用方法
    getCurrentBinFilePath: (...paths: string[]) => string;
    // 默认提供的使用axios推送文件到gitlab的方法（只支持gitlab）
    publishFileWithGitlabCommit: typeof publishFileWithGitlabCommit;
    // 使用git命令推送文件的方法（支持github gitlab）
    publishFileWithGit: typeof publishFileWithGit;
    // 一些输出控制台新的方法(success warn loading error 等)
    logTools: typeof logTools;
  };
  toolsModules: {
      // 交互性的工具库 具体用法可以参考 https://github.com/SBoudrias/Inquirer.js/
    prompt: PromptModule;
    // axios
    axios: AxiosStatic;
    // fs-extra
    fse: typeof fse;
  };
}
```

### 一些额外的命令
1. `wcli plugin list`: 表格展示已安装过得plugin列表。
2. `wcli plugin remove XXX`: 删除具体某个插件。
3. `wcli plugin upgrade`: 更新插件(todo 暂时是通过插件重新安装的方法更新)

## wcli dev
执行插件目录下的`dev.js`文件，在当前目录下可以手动启动一个webpack server服务。可以通过`Inquirer`让用户选择一些前置性的参数如（开发环境，代理地址，需要开发的路由模块等）个性化的启动开发模式。  

在`dev.js`中您可以使用一些框架库如`vue-cli` `create-react-app`字典的script命令，也可以在`dev.js`中自搭建一个webapck的server进行开发。

## wcli build

跟wcli dev同理。可以自由定制项目打包时的环境以及参数等。
