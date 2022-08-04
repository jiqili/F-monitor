import {AjaxInterceptor} from './xhr'
import {FetchInterceptor} from './fetch'

const ajaxInterceptor= new AjaxInterceptor()
ajaxInterceptor.init()
const fetchInterceptor= new FetchInterceptor()
fetchInterceptor.init()