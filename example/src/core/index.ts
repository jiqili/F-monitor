import './src/performance/index';
import { setUrlIgnoreList } from './src/http/index'
import { initPerformance } from './src/performance';
import { initUser } from './src/user';
import { ErrorInterceptor } from './src/error';
import { ErrorBoundary }from './src/error/errorBoundary'; //react错误边界 


initPerformance();
initUser();
//测试异常部分
const errorInterceptor = new ErrorInterceptor();
errorInterceptor.init();

console.log('monitor plugin installed');

export const SetUrlIgnoreList =setUrlIgnoreList
export const ReactBoundary=ErrorBoundary //导出错误边界