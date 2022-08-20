import './src/performance/index';
import { SetUrlIgnoreList } from './src/http/index'
import { initPerformance } from './src/performance';
import { initUser } from './src/user';
import { ErrorInterceptor } from './src/error';
import { SetEmitOptions } from './src/emit';
import { ErrorBoundary }from './src/error/errorBoundary'; //react错误边界 


initPerformance();
initUser();
//测试异常部分
const errorInterceptor = new ErrorInterceptor();
errorInterceptor.init();

console.log('monitor plugin installed');
export function SetOptions(options: {
  setEmitLen?: number
  setEmitTime?: number
  setUrlIgnoreList?: string[] 
}){
  SetEmitOptions(options.setEmitLen,options.setEmitTime)
  SetUrlIgnoreList(options.setUrlIgnoreList)
}

export const ReactBoundary=ErrorBoundary //导出错误边界