async function customDemoFn(context) {
  const {
    config: {
      wcliConfigJson,
      isDebug: debug,
      extraArgArray
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

module.exports = {
  demo: customDemoFn
}
