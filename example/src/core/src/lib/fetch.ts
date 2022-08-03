import { event } from "../env";
import { emit } from "../emit";



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


export class FetchInterceptor {

  init(): void {
    const OldFetch = fetch

    Object.defineProperty(window, "fetch", {
      configurable:true,//可删除
      enumerable:true,//可枚举
      get() {
          return (url: string, options: any = {}) => {
            this._url = url
            this._method = options.method || 'get'
            this._data = options.body
            if(!this._url.match(/jiancexitong/) && !this._url.match(/sockjs/))//防止死循环
            {
              this._isUrlInIgnoreList = false
            }
            else{
              this._isUrlInIgnoreList = true
            }

            const sendTime: number = Date.now() //发送请求的开始时间
            return OldFetch(url, options)
              .then((res)=> {
                
                const status = res.status
                const successDataLog: IlogData = {
                  status,
                  requestUrl: res.url,
                  sendTime,
                  requestMethod: this._method,
                  requestData: this._data,
                  response: res,
                  duration: Date.now() - sendTime,
                } 
                // console.log(successDataLog)

                const errorDataLog: IHttpReqErrorRes = {
                  requestMethod: this._method,
                  requestUrl: this._url,
                  requestData: this._data,
                  errorMsg: res.statusText,
                  errorType: 'httperror'
                }
                console.log(res)
                if(!this._isUrlInIgnoreList){
                  if(status >= 200 && status <300) {
                    emit({
                      type: 'Request',
                      name: 'fetch-success',
                      data: successDataLog,
                    })
                  } else {
                    emit({
                      type: 'Request',
                      name: 'fetch-error',
                      data: errorDataLog,
                    })
                  }
                }

                return Promise.resolve(res)
              })
              .catch((e: Error) => { //无法发起请求，连接失败
                const errorLog: IHttpReqErrorRes = {
                  requestMethod: this._method,
                  requestUrl: this._url,
                  requestData: this._data,
                  sendTime,
                  errorMsg: e.message,
                  errorType: 'httperror'
                };

                if (!this._isUrlInIgnoreList) {
                  console.log(e)
                  emit({
                    type: 'Request',
                    name: 'fetch-failconnect',
                    data: errorLog,
                  })
                }
              })
          }
      },
    })
  }
}






































