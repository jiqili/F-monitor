import { emit } from '../emit'
import { ErrorInfo } from '../interface/error'
// import sourceMap from 'source-map'
// import { readFileSync } from 'fs'
export class ErrorInterceptor {
    // async sourceMapAnalysis(sourceMapFile:any, line: number, column: number, offset: any) {
    //     const consumer:any = await new sourceMap.SourceMapConsumer(sourceMapFile)
    //     const sm:any = consumer.originalPositionFor({line, column})
    //     const { sources } = consumer
    //     const smIndex = sources.indexOf(sm.source)
    //     const smContent = consumer.sourceContent[smIndex]
    //     const rawLines = smContent.split(/r?\n/g)
    //     let begin = sm.line - offset
    //     const end = sm.line + offset + 1
    //     begin = begin < 0 ? 0 : begin
    //     const context:any = rawLines.slice(begin, end)
    //     consumer.destroy()
    //     return {
    //         context,
    //         originLine: sm.line + 1,
    //         source: sm.source
    //     }
    // }
    init(mapFileUrl?: string): void {
        let errorSet:Set<string> = new Set()
        
        function errorEmit(info: ErrorInfo) {
            let errorTag:string = info.type + info.data.reason + info.data.url
            if(!errorSet.has(errorTag)) {
                emit(info)
                errorSet.add(errorTag)
            }
        }
        // window.addEventListener('error', function (event) {
        //     const target: any = event.target || event.srcElement
        //     const isElementTarget =
        //         target instanceof HTMLScriptElement ||
        //         target instanceof HTMLLinkElement ||
        //         target instanceof HTMLImageElement
        //     if (!isElementTarget) return false

        //     let url: String
        //     if (target instanceof HTMLLinkElement) {
        //         url = target.href
        //     } else {
        //         url = target.src
        //     }

        //     const errorType = ErrorType.resourceError
        //     const errorObj: BaseError = {
        //         url,
        //         errorType: errorType,
        //         context: this
        //     }
        //     emit({ type: 'Error', name: 'resourceData', data: errorObj })
        // }, true)

        window.onerror = (msg, url, row = 1, col = 1, error) => {
            console.log('JS Error', {msg, url, row, col, error})
            let stack = error?.stack?.split('\n')
            console.log(stack)
            // const localSourceMap = JSON.parse(readFileSync('./xxxxxxxxxxx.map', 'utf-8').toString())
            // console.log(this.sourceMapAnalysis(localSourceMap, row, col, 2))
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
