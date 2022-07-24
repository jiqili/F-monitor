import {emit} from '../emit'

/*
* FP FCP DOMReady DNS等
* */
const observer = new PerformanceObserver(list => {
  for(const entry of list.getEntries()) {
    console.log(entry)
    emit({type: 'Performance', name: entry.name, data: {duration: entry.duration}})
  }
})

document.addEventListener('DOMContentLoaded',function(){
  emit({type: 'Performance', name: 'DOMContentLoaded', data: {}})
});

observer.observe({entryTypes:['paint']})
export {}