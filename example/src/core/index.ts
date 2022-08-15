import './src/performance/index';
import './src/http/index'
import { initPerformance } from './src/performance';
import { initUser } from './src/user';
import { ErrorInterceptor } from './src/error';
import { ErrorBoundary }from './src/error/errorBoundary';

initPerformance();
initUser();
export const ReactBoundary=ErrorBoundary
//测试异常部分
const errorInterceptor = new ErrorInterceptor();
errorInterceptor.init();

console.log('monitor plugin installed');
