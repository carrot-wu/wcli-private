import throwHandleError from '../../src/utils/errorHandler/error'

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
      logTools,
      throwHandleError
    },
    toolsModules: {
      prompt,
      axios,
      fse
    }
  } = context
}
