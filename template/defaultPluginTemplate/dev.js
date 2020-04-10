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
      logTools
    },
    toolsModules: {
      prompt,
      axios,
      fse
    }
  } = context
}
