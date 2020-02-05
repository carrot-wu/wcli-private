import { WCliConfigJson } from "../types/configJsonType";

export const defaultWCliConfigJson:WCliConfigJson =  {
  name: 'DEFAULT_NAME',
  package: 'yarn',
  path: {
    output: 'dist',
    public: '/'
  },
  plugin: 'DEFAULT_PLUGIN',
  devServer: {
    port: 8888,
    https: false,
    proxy: {}
  },
  publish: null
}
