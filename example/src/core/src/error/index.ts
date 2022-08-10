import { emit } from '../emit'
import ErrorStackParser from "error-stack-parser";
import stringify from "json-stringify-safe";

export interface BaseError {
  errorType: ErrorType;
  url?: string | undefined;
  path?: string | undefined;
  context?: any;
}

export enum ErrorType {
  vueJsError = "vuejsError",
  jsError = "jsError",
  unHandleRejectionError = "unHandleRejectionError",
  resourceError = "resourceError",
  httpRequestError = "httpError"
}

export interface IError extends BaseError {
    msg: string | Event;
    line: number | undefined;
    column: number | undefined;
    stackTrace: string;
  }

  export interface IUnHandleRejectionError extends BaseError {
    msg: string;
  }




export class ErrorObserver {
    constructor() {}

    init(): void {

        const self = this
        const oldOnError = window.onerror
        const oldUnHandleRejection = window.onunhandledrejection

        window.onerror = function (...args) { //运行时错误
            if (oldOnError) { //存在此方法则调用
                oldOnError(...args)
            }

            const [msg, url, line, column, error] = args

            const stackTrace = error ? ErrorStackParser.parse(error) : [] //错误堆栈
            console.log(stackTrace,'stack')
            const msgText = typeof msg === "string" ? msg : msg.type;
            const errorObj: IError = {
                msg: msgText,
                url,
                line,
                column,
                stackTrace: stringify(stackTrace),
                errorType: ErrorType.jsError,
                context: this
              }
            console.log(errorObj,'errorobj')


            emit({
                type: 'Error',
                name: 'js-error',
                data: errorObj,
              })

        }


        window.onunhandledrejection = function (e: PromiseRejectionEvent) { //promise-error
            if (oldUnHandleRejection) {
              oldUnHandleRejection.call(window, e)
            }
      
            const error = e.reason
            const errMsg = error instanceof Error ? error.message : error
      
            const errorObj: IUnHandleRejectionError = {
              msg: errMsg,
              errorType: ErrorType.unHandleRejectionError,
              context: this
            }
      
            emit({
                type: 'Error',
                name: 'promise-error',
                data: errorObj,
              })
          }


        window.addEventListener('error', function (event) {//资源异常
            const target: any = event.target || event.srcElement
            const isElementTarget =
                target instanceof HTMLScriptElement ||
                target instanceof HTMLLinkElement ||
                target instanceof HTMLImageElement
            if (!isElementTarget) return false   //不是资源异常则跳过，防止重复触发钩子捕获到js错误

            let url: string
            if (target instanceof HTMLLinkElement) {
                url = target.href
            } else {
                url = target.src
            }

            const errorType = ErrorType.resourceError
            const errorObj: BaseError = {
                url,
                errorType: errorType,
                context: this
            }
            emit({
                type: 'Error',
                name: 'resource-error',
                data: errorObj,
              })
              
        },true)
    }
}


const errorobserver = new ErrorObserver ()
errorobserver.init()

