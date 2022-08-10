/**
 * base类，接口、过滤接口
 * 
 */


export interface IHttpReqErrorRes { //请求失败-上报http类型错误接口
  requestMethod: string | undefined;
  sendTime?: number;
  errorType: string; //错误类型 js、promise、http等
  requestUrl: string | undefined;
  requestData: string | null;
  errorMsg?: string | undefined; //错误信息
  status?: number; //状态码
  timeStamp?:number; //当前上报时间
}

export interface IlogData {//请求成功-上报数据接口
  timeStamp?:number; //当前时间
  duration?: number; //持续时间
  requestUrl?: string; //请求地址
  sendTime?: number;
  response?: string | Response; //响应体
  context?: any; //请求参数
  requestMethod?: string;
  requestData?: any; 
  status: number; //状态码
}

export type inoreTYPE = string[] | null | undefined //过滤type


export class BaseInterceptor {
  public _ignoreList: inoreTYPE

  constructor(ignoreList?: inoreTYPE){
    this._ignoreList=ignoreList
  }

  isUrlInIgnoreList(url: string): boolean {
    if(!this._ignoreList ) return false

    return this._ignoreList.some((urlItem)=>{
      return url?.includes(urlItem)
    })
  }
}

