import { emit } from "../emit";
import { IHttpReqErrorRes, IlogData, inoreTYPE, BaseInterceptor} from "./base"


export class FetchInterceptor extends BaseInterceptor {

  constructor(ignoreList?: inoreTYPE){
    super(ignoreList)
  }

  init(): void {
    const OldFetch = fetch
    const self = this

    Object.defineProperty(window, "fetch", {
      configurable:true,//可删除
      enumerable:true,//可枚举
      get() {
          return (url: string, options: any = {}) => {
            this._url = url
            this._method = options.method || 'get'
            this._data = options.body
            const stack = new Error().stack?.toString().split('\n')
            this._isUrlInIgnoreList=self.isUrlInIgnoreList(this._url)
            

            const sendTime: number = Date.now() //发送请求的开始时间
            return OldFetch(url, options)
              .then((res)=> {
                
                const status = res.status
                const successDataLog: IlogData = {
                  status,
                  requestUrl: res.url,
                  sendTime,
                  requestMethod: this._method,
                  duration: Date.now() - sendTime,
                } 

                const errorDataLog: IHttpReqErrorRes = {
                  status,
                  requestMethod: this._method,
                  requestUrl: this._url,
                  requestData: this._data,
                  duration: Date.now() - sendTime,
                  sendTime,
                  stack,
                }
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
          }
      },
    })
  }
}


