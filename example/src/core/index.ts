import './src/performance/index';

import { initPerformance } from './src/performance';
import { initUser } from './src/user';
import { ErrorInterceptor } from './src/error';

initPerformance();
initUser();

//测试异常部分
const errorInterceptor = new ErrorInterceptor();
errorInterceptor.init();

console.log('monitor plugin installed');
