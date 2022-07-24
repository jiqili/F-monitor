type Timeout = ReturnType<typeof setTimeout>

/**
 * performance data with duration
 */
interface performance {
  duration: number
}
/**
 * event is monitor data unit
 * @param {*} type Error | Performance | User 
 * @param {*} name the name of event
 * @param {*} data the data of event
 */
interface event {
  type: 'Error' | 'Performance' | 'User',
  name: string,
  data: performance,
  time?: number
}

let events:event[] = []
let timer: Timeout
const requestUrl: string | URL = 'http://localhost:8080'
const MAX_CACHE_LEN = 5
const MAX_WAITING_TIME = 5000

/**
 * emit monitor data
 * @param {*} data the event with type, name and data
 */
function emit(data: event) {
  data.time = Date.now()
  events.push(data)
  clearTimeout(timer)
  events.length >= MAX_CACHE_LEN
  ? send()
  : timer = setTimeout(send, MAX_WAITING_TIME)
}

/**
 * send request in requestIdleCallback()  
 * by navigator.sendBeacon, request will not be broken when close blower
 */
function send() {
  if(events.length) {
    const sendEvents = events.slice(0, MAX_CACHE_LEN)
    events = events.slice(MAX_CACHE_LEN)
    navigator.sendBeacon(requestUrl, JSON.stringify(sendEvents))
    if(events.length) {
      window.requestIdleCallback(() => setTimeout(send, 17))
    }
  }
}

export {emit}