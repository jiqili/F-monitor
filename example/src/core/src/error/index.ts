import { emit } from '../emit'
import {
    TrackerEvents,
    ErrorType,
    BaseError,
    IError,
    IUnHandleRejectionError
} from './errorType'
import ErrorStackParser from 'error-stack-parser'

import stringify from 'json-stringify-safe'
export class ErrorObserver {
    constructor() {}

    init(): void {
        const self = this
        const oldOnError = window.onerror
        const oldUnHandleRejection = window.onunhandledrejection
        window.onerror = function (...args) {
            //运行时错误
            if (oldOnError) {
                oldOnError(...args)
            }
            const [msg, url, line, column, error] = args
            const stackTrace = error ? ErrorStackParser.parse(error) : []
            console.log(stackTrace)
            const msgText = typeof msg === 'string' ? msg : msg.type
            const errorObj: IError = {
                msg: msgText,
                url,
                line,
                column,
                stackTrace: stringify(stackTrace),
                errorType: ErrorType.jsError,
                context: this
            }
            console.log(errorObj, 'errorObj')

            emit({
                type: 'Error',
                name: 'js-error',
                data: errorObj
            })
        }

        window.onunhandledrejection = function (e: PromiseRejectionEvent) {
            if (oldUnHandleRejection) {
                oldUnHandleRejection.call(window, e)
            }
            const error = e.reason
            const errMsg = error instanceof Error ? error.message : error

            const errorObj: IUnHandleRejectionError = {
                msg: errMsg,
                errorType: ErrorType.unhandledRejectionError,
                context: this
            }
            emit({
                type: 'Error',
                name: 'promise-error',
                data: errorObj
            })
        }

        window.addEventListener(
            //资源异常
            'error',
            function (event) {
                console.log('发生异常！')
                const target: any = event.target || event.srcElement
                const isElementTarget =
                    target instanceof HTMLScriptElement ||
                    target instanceof HTMLLinkElement ||
                    target instanceof HTMLImageElement
                if (!isElementTarget) return false

                let url: String
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
                emit({ type: 'Error', name: 'resourceData', data: errorObj })
            },
            true
        )
    }
}
