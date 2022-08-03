import './src/performance/index'
import {AjaxInterceptor} from './src/lib/xhr'
import {FetchInterceptor} from './src/lib/fetch'

const ajaxInterceptor= new AjaxInterceptor()
ajaxInterceptor.init()
const fetchInterceptor= new FetchInterceptor()
fetchInterceptor.init()

// type: 'Error' | 'Performance' | 'User' | 'Request'
// name: string
// data: performance | user
console.log('monitor plugin installed')

