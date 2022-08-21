import {event} from "../interface/env"; 
import {getBrowserInfo, getPlatform} from "../utils/user";


type Timeout = ReturnType<typeof window.setTimeout>
let timer: Timeout

let events: any[] = []
let requestUrl: string | URL = ''
const MAX_CACHE_LEN = 5
const MAX_WAITING_TIME = 5000

function emitPatch(data: event[]) {
  for (const item of data) {
    emit(item)
  }
}
/**
 * emit monitor data
 * @param {*} data the event with type, name and data
 */
function emit(data: event) {
  console.log('emit', data)
  data.timeStamp = Date.now()
  data.platform = getPlatform()
  data.browser = getBrowserInfo()
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
function initServer(url: any) {
  requestUrl = url
}
export {emit, emitPatch, initServer}