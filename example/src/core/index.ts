import './src/performance/index';
import './src/http/index'
import { initPerformance } from './src/performance';
import { initUser } from './src/user';
import { ErrorInterceptor } from './src/error';
import { initServer } from './src/emit'


exports.initMonitor = (url: any) => {
    initServer(url)
    initPerformance();
    initUser();
    const errorInterceptor = new ErrorInterceptor();
    errorInterceptor.init();
    console.log('monitor plugin installed');
}