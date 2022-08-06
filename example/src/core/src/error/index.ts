import { emit } from '../emit'
import { TrackerEvents, ErrorType, BaseError } from '../utils/error'
export class Error {
    constructor() {}

    init(): void {
        const self = this
        window.addEventListener('error', function (event) {
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
        })
    }
}
