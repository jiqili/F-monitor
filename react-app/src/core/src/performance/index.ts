import {emit} from '../emit/index'
const observer = new PerformanceObserver(list => {
  for(const entry of list.getEntries()) {
    emit({type: 'Performance', name: entry.name, data: {duration: entry.duration}})
  }
})
observer.observe({entryTypes:['paint']})
export {}