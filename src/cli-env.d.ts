// declare module "*.json" {
//     const value: any;
//     export default value;
// }

declare module 'download-git-repo' {
  interface Options {
    clone?: boolean;
    proxy?: Record<string, unknown>;
    headers?: Record<string, unknown>;
    filter?: any;
  }
  interface Callback {
    (error?: Error): void;
  }
  function downloadGitRepo(url: string, direction: string, options: Options, callback: Callback): void;
  function downloadGitRepo(url: string, direction: string, options: Callback): void;
  function downloadGitRepo(url: string, direction: string, options: Options | Callback, callback?: Callback): void;
  export = downloadGitRepo;
}
