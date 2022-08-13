import { emit } from '../emit'
import { ErrorInfo, ResourceErrorInfo } from '../interface/error'
export class ErrorInterceptor {
    init(): void {
        let errorSet:Set<string> = new Set()
        
        function errorEmit(info: ErrorInfo) {
            let errorTag:string = info.type + info.data.reason + info.data.url
            if(!errorSet.has(errorTag)) {
                emit(info)
                errorSet.add(errorTag)
            }
        }
        
        window.addEventListener('error', function (event) {
            const target: any = event.target || event.srcElement
            const isElementTarget =
                target instanceof HTMLScriptElement ||
                target instanceof HTMLImageElement
            if (!isElementTarget) return false
            let url: string = target.src
            errorEmit({ type: 'Error', name: 'Resource Error', data: {url, reason: 
                target instanceof HTMLImageElement ? 'Image Load Error' : 'Script Load Error'} })
        }, true)

        window.onerror = (msg, url, row = 1, col = 1, error) => {
            console.log('JS Error', {msg, url, row, col, error})
            errorEmit({type: 'Error', name: 'JS Error', data: {reason: msg.toString(), url, row, col, error}})
            return true
        }
        window.addEventListener('unhandledrejection', function(event) {
            errorEmit({type: 'Error', name: 'Promise Error', data: {reason: event.reason, url: window.location.href}})
        }, true);

        const _error = console.error
        console.error = error => {
            errorEmit({type: 'Error', name: 'Console Error', data: {reason: error, url: window.location.href}})
            _error.call(console, error)
        } 
    }
}
