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
    unhandledRejection = 'unhandledRejection'
}

export interface BaseError {
    errorType: ErrorType
    url?: String | undefined
    path?: String | undefined
    context?: any
}
