import {AjaxInterceptor} from './xhr'
import {FetchInterceptor} from './fetch'
import {inoreTYPE} from './base'

const igoreUrlArr: inoreTYPE = [] //要过滤的请求url

const ajaxInterceptor= new AjaxInterceptor() //(igoreUrlArr)可选：过滤url
ajaxInterceptor.init()
const fetchInterceptor= new FetchInterceptor()
fetchInterceptor.init()