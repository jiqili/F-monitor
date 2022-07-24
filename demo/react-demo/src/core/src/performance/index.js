const observer = new PerformanceObserver(list => {
  for(const entry of list.getEntries()) {
    console.log(entry)
    // console.log(entry.name)
    // console.log(entry.entryType)
    // console.log(entry.duration)
  }
})
observer.observe({entryTypes:['resource', 'paint']})