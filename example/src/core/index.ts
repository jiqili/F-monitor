import './src/performance/index'
<<<<<<< HEAD
import {AjaxInterceptor} from './src/lib/xhr'
import {FetchInterceptor} from './src/lib/fetch'
import {init} from './src/performance'
import {initUser} from './src/user'

// const ajaxInterceptor= new AjaxInterceptor()
// ajaxInterceptor.init()
// const fetchInterceptor= new FetchInterceptor()
// fetchInterceptor.init()

initUser()

=======
import './src/http/index'
// type: 'Error' | 'Performance' | 'User' | 'Request'
// name: string
// data: performance | user | 'Request'
>>>>>>> origin/xch
console.log('monitor plugin installed')

