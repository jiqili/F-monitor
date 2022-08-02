import './src/performance/index'
import {AjaxInterceptor} from './src/lib/xhr'

const ajaxInterceptor=new AjaxInterceptor({
  type: 'Request',
  name: 'xhr',
  data: performance
})
ajaxInterceptor.init()

// type: 'Error' | 'Performance' | 'User' | 'Request'
// name: string
// data: performance | user
console.log('monitor plugin installed')

