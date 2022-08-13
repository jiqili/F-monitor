//错误类型

export enum TrackerEvents {
    jsError = 'jsError',
    unhandledRejection = 'unhandledRejection',
    resourceError = 'resourceError',
    reactError = 'reactError'
}

export enum ErrorType {
    jsError = 'jsError',
    resourceError = 'resourceError',
    httpError = 'httpError',
    unhandledRejectionError = 'unhandledRejectionError'
}

export interface BaseError {
    errorType: ErrorType
    url?: String | undefined
    path?: String | undefined
    context?: any
}
export interface IError extends BaseError {
    msg: string | Event
    line: number | undefined
    column: number | undefined
    stackTrace: string
}

export interface IUnHandleRejectionError extends BaseError {
    msg: string
}
