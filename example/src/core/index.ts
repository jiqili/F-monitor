import './src/performance/index';
import { SetUrlIgnoreList } from './src/http/index'
import { initPerformance } from './src/performance';
import { initUser } from './src/user';
import { ErrorInterceptor } from './src/error';
import { SetEmitOptions } from './src/emit';
import { ErrorBoundary }from './src/error/errorBoundary'; //react错误边界 



export const ReactBoundary = ErrorBoundary //导出错误边界

export const initMonitor = (options: {
  setsetEmitUrl?: any
  setEmitLen?: number
  setEmitTime?: number
  setUrlIgnoreList?: string[] 
})=>{
  initPerformance();
  initUser();
  const errorInterceptor = new ErrorInterceptor();
  errorInterceptor.init();
  console.log('monitor plugin installed');
  SetEmitOptions(options.setsetEmitUrl,options.setEmitLen,options.setEmitTime)
  SetUrlIgnoreList(options.setUrlIgnoreList)
}



