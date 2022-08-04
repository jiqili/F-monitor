import './src/performance/index'

import {AjaxInterceptor} from './src/http/xhr'
import {FetchInterceptor} from './src/http/fetch'
import {initPerformance} from './src/performance'
import {initUser} from './src/user'

const ajaxInterceptor= new AjaxInterceptor()
ajaxInterceptor.init()
const fetchInterceptor= new FetchInterceptor()
fetchInterceptor.init()
initPerformance()
initUser()

console.log('monitor plugin installed')

