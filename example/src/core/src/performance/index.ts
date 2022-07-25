import {emit} from '../emit'
import {Context} from "../context/context";
import {event, handler} from "../env";

/*
* FP FCP DOMReady DNS等
* */

const performanceHandler: handler = function (ctx: Context): event {
  let navigationEntry = ctx.navigationEntry
  let {domainLookupStart, domainLookupEnd} = navigationEntry
  // DNS
  let domainLookupTime = domainLookupEnd - domainLookupStart
  console.log(ctx)
  return {type: 'Performance', name: 'DNS', data: {DNS: domainLookupTime}}
}


const f = function () {
  const observer = new PerformanceObserver(list => {
    for(const entry of list.getEntries()) {
      emit({type: 'Performance', name: entry.name, data: {duration: entry.duration}})
    }
  })
  observer.observe({entryTypes:['paint']})
}


document.addEventListener('DOMContentLoaded',function(){
  emit({type: 'Performance', name: 'DOMContentLoaded', data: {}})
});
export {performanceHandler}