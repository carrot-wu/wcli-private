interface ErrorConfig {
  code?: number;
  msg: string;
}
export class SystemError extends Error {
  public code: number;
  public msg: string;

  public constructor(config: ErrorConfig) {
    const { code = 999, msg } = config
    super(msg)
    this.code = code
    Object.setPrototypeOf(this, SystemError.prototype)
  }
}

export default function throwHandleError(msg:string, code?:number){
  throw new SystemError({msg, code})
}
