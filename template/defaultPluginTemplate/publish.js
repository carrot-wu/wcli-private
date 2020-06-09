import throwHandleError from '../../src/utils/errorHandler/error'

module.exports = function(context) {
  const {
    config: {
      wcliConfigJson,
      isDebug: debug,
      token: publishToken,
      publishCommitMsg
    },
    paths: {
      currentBinPath
    },
    utils: {
      getCurrentBinFilePath,
      publishFileWithGitlabCommit,
      publishFileWithGit,
      logTools,
      throwHandleError
    },
    toolsModules: {
      prompt,
      axios,
      fse,
      simpleGit
    }
  } = context
}
