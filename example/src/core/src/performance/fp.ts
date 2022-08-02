import observe from "../lib/observe";
import {getFirstHiddenTime} from "web-vitals/dist/modules/lib/polyfills/getFirstHiddenTimePolyfill";

const getFP = (): Promise<PerformanceEntry> | undefined => {
    return new Promise((resolve, reject) => {
        const [entry] = performance.getEntriesByName('first-paint')
        resolve(entry)
        const entryHandler = (entry: PerformanceEntry) => {
            if (entry.name === 'first-paint') {
                if (po) {
                    po.disconnect()
                }
                if (entry.startTime < getFirstHiddenTime()) {
                    resolve(entry)
                }
            }
        }

        const po = observe('paint', entryHandler)
    })
}

export {}