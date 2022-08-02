import { event } from "../env";
import { emit } from "../emit";
class BaseObserver{
  public _options: any


  constructor(options: any) {
    this._options = options;
  }
}

interface BaseError { //jichu
  errorType: ErrorType;
  url?: string | undefined;
  path?: string | undefined;
  context?: any;
}

export interface IHttpReqErrorRes extends BaseError { //http cuowu
  requestMethod: string | undefined;
  requestUrl: string | undefined;
  requestData: string | null;
  errorMsg?: string | undefined;
  status?: number;
  timeStamp?:number;
}

enum ErrorType {
  vueJsError = "vuejsError",
  jsError = "jsError",
  unHandleRejectionError = "unHandleRejectionError",
  resourceError = "resourceError",
  httpRequestError = "httpError"
}

export interface IlogData {
  timeStamp?:number;
  duration?: number; //持续时间
  requestUrl?: string; //请求地址
  response?: string | Response; 
  context?: any;
  requestMethod?: string;
  requestData?: any; 
  status: number; //状态码
}

// global.d.ts
// interface XMLHttpRequest {
//   _url?: string;
//   _method: string;
//   _isUrlInIgnoreList: boolean; 判断请求是否发给监测后台，是的话则忽略监测此请求,防止死循环
// }

interface IAjaxReqStartRes {
  context: any;
}




export class AjaxInterceptor extends BaseObserver{
  constructor(options: event){
    super(options)
    this._options = options
  }

  init(): void {
    if (!XMLHttpRequest) return ; //XML bucunzai

    const self=this; //self为new出来的xml实例,即this的指向
    const Oldopen = XMLHttpRequest.prototype.open

    XMLHttpRequest.prototype.open = function(
      method: string,
      url: string | URL,
      async?: boolean
    ){
      //在global.d.ts 加接口，给XMLHttpRequest添加属性_url,不然会提示xml上不存在_url
      this._url = typeof url === 'string' ? url : url.href
      this._method = method
      if(!this._url.match(/jiancexitong/) && !this._url.match(/sockjs/))//防止死循环
      {
        this._isUrlInIgnoreList = false
      }
      else{
        this._isUrlInIgnoreList = true
      }

      const reqStartRes: IAjaxReqStartRes = {
        context: this
      }

      return Oldopen.call(
        this,
        method,
        this._url,
        typeof async === "boolean" ? async : true
      )
    }

    const Olesend = XMLHttpRequest.prototype.send
    XMLHttpRequest.prototype.send = function (...rest: any[]) {
      const body = rest[0]
      const requestData: string = body
      const startTime = Date.now() //记录开始时间

      this.addEventListener("readystatechange", function () {
        if (this._isUrlInIgnoreList){
          return //跳过发送给监测系统的请求
        }
        
        if (this.readyState === 4 ) {//当state为4,所有相应数据接收完毕
          if (this.status >=200 && this.status < 300) {//请求成功
            const logData: IlogData = {
              duration: Date.now() - startTime,
              requestUrl: this.responseURL,
              response: this.response ? JSON.stringify(this.response) : '',//响应体
              context: this,
              status: this.status
            }
            emit(logData)
          } else {//qingqiu shibai
            const errorType = ErrorType.httpRequestError
            const errorDataLog: IHttpReqErrorRes = {
              requestMethod: this._method,
              requestUrl: this._url,
              requestData,//qingqiuti
              errorType,//cuowuleixin httperror
              context: this,
              status: this.status
            }
            emit(errorDataLog)
          }
        }
      })

      return Olesend.call(this, body)
    }
  }
}