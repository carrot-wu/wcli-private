module.exports = function(context) {
  const {
    config: {
      wcliConfigJson,
      isDebug: debug
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
