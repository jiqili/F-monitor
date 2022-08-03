import './src/performance/index'
import {AjaxInterceptor} from './src/lib/xhr'
import {FetchInterceptor} from './src/lib/fetch'
import {init} from './src/performance'

const ajaxInterceptor= new AjaxInterceptor()
ajaxInterceptor.init()
const fetchInterceptor= new FetchInterceptor()
fetchInterceptor.init()

init()

console.log('monitor plugin installed')

