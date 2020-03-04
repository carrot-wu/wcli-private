
export type PluginCommand = 'install' | 'upgrade' | 'remove' | 'list'

export interface PluginCacheParams {
  isNpm: boolean;
  pluginName: string;
  version: string;
  args: string;
  pluginPath: string;
}

export type PluginCacheJson = {
  [key in string]: PluginCacheParams
}
