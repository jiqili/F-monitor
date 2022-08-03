import {event} from "../env"; 
import { EventEmitter } from "events";//引入第三方库来进行事件监听
import { func } from "prop-types";


type Timeout = ReturnType<typeof window.setTimeout>
let timer: Timeout

let events: any[] = []
const requestUrl: string | URL = 'http://localhost:8080'
const MAX_CACHE_LEN = 5
const MAX_WAITING_TIME = 5000

/**
 * emit monitor data
 * @param {*} data the event with type, name and data
 */
function emit(data: event) {
  data.timeStamp = Date.now()
  data.type='Request'
  events.push(data)
  clearTimeout(timer)
  events.length >= MAX_CACHE_LEN
  ? send()
  : timer = setTimeout(send, MAX_WAITING_TIME)
}



function safeStringify(sendevents: any[]){
  let cache: any= []
  const str = JSON.stringify(sendevents, function(key, value){
    if (typeof value === 'object' && value !== null){
      if (cache.indexOf(value) !== -1) {
        return
      }
      cache.push(value)
    }
    return value
  })
  cache = null
  return str
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

/**
集成
 */
export enum TrackerEvents {
  /* SDK expose events */
  jsError = "jsError",
  unHandleRejection = "unHandleRejection",
  resourceError = "resourceError",
  reqError = "reqError",
  vuejsError = "vuejsError",
  batchErrors = "batchErrors",

  performanceInfoReady = "performanceInfoReady",
  reqStart = "reqStart",
  reqEnd = "reqEnd",
  mouseTrack = "mouseTrack",
  event = "event",

  /* SDK inner events */
  _clickEle = "_clickEle",
  _console = "_console",
  _onConsoleTrack = "_onConsoleTrack",
  _offConsoleTrack = "_offConsoleTrack",
  _mouseTrack = "_mouseTrack",
  _initOptions = "_initOptions",
  _globalDataChange = "_globalDataChange"
}




export class MyEmitter extends EventEmitter {
  private globalData: any

  constructor(){
    super()
    this.init()
  }

  init() {
    this.globalData = {}
    //on为第三方库的方法,监听globaldatachange事件， 可通过this.emit(globaldatachange， ...)触发事件
    this.on(TrackerEvents._globalDataChange, (globalData) => {
      this.globalData=globalData
    })
  }

  public customEmit(event: string | symbol, ...args: any[]): void {//changguishangjiao
    const [data, ...rest] = args

  
  }

}




export const myEmitter = new MyEmitter()
export {emit}