import './src/performance/index';

import { AjaxInterceptor } from './src/http/xhr';
import { FetchInterceptor } from './src/http/fetch';
import { initPerformance } from './src/performance';
import { initUser } from './src/user';
import { Error } from './src/error';

const ajaxInterceptor = new AjaxInterceptor();
ajaxInterceptor.init();
const fetchInterceptor = new FetchInterceptor();
fetchInterceptor.init();
initPerformance();
initUser();

//测试异常部分
const error = new Error();
error.init();
console.log('monitor plugin installed');
