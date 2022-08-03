import {emit} from '../emit'
import '../lib/observe'
import observe from "../lib/observe";
import {event} from "../env";

const [perfEntries] = performance.getEntriesByType("navigation");
const n = perfEntries as PerformanceNavigationTiming
const [resourceEntries] = performance.getEntriesByType("resource");
const resourceEntry = resourceEntries as PerformanceResourceTiming
const [paintEntries] = performance.getEntriesByType("paint");
const paintEntry = paintEntries as PerformancePaintTiming

const getPerformanceData = (isLoaded: boolean) => {
  if (!isLoaded) {
    console.warn('首屏异常')
  }
  // 从 请求开始 到 完成解析DOM树，开始加载资源 的时间
  // 白屏时间
  const fp = n.domInteractive - n.fetchStart
  // 从 请求开始 到 load事件发送 的时间
  // 首屏时间
  const fcp = isLoaded? n.loadEventStart - n.fetchStart: performance.now() - n.fetchStart
  // dns时间（如有缓存为0）
  const dns = n.domainLookupEnd - n.domainLookupStart
  // 从 请求开始 到 DOM解析完成的时间
  const domReady = n.domContentLoadedEventEnd - n.fetchStart

  emit({type: 'Performance', name: 'fp', data: fp})
  emit({type: 'Performance', name: 'fcp', data: fcp})
  emit({type: 'Performance', name: 'domReady', data: domReady})
  emit({type: 'Performance', name: 'dns', data: dns})

  // const dcl = n.domContentLoadedEventStart - n.fetchStart
  // emit({type: 'Performance', name: 'dcl', data: dcl})
}


const init = () => {
  setTimeout(() => {
    window.removeEventListener('load', () => {getPerformanceData(true)})
    getPerformanceData(false)
  }, 10000)
  window.addEventListener('load', () => {getPerformanceData(true)})
}

export {init}