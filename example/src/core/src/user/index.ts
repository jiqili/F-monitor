import {getPlatform, getUserAgent, ipify} from "../utils/user";
import {emit} from "../emit";

/*
* PV UV 自定义行为埋点 页面停留时间 用户热点页面
* */
const userAgent = getUserAgent()
// console.log(window.navigator)
// console.log(getPlatform())
// document.cookie = "11"
// console.log(document.cookie)
const initUser = async () => {
    const ip = await ipify()
    emit({type: 'User', name: 'pv', data: {
            ip,
            'url': window.location.href
        }})
    // window.addEventListener('hashchange', () => {
    //     console.log(111)
    //     emit({
    //         type: 'User', name: 'pv', data: {
    //             ip,
    //             'url': window.location.href
    //         }
    //     })
    // })
    window.addEventListener('popstate', () => {
        console.log(222)
        emit({
            type: 'User', name: 'pv', data: {
                ip,
                'url': window.location.href
            }
        })
    })
    const oldPushState = window.history.pushState.bind(window.history);
    window.history.pushState = (...args) => {
        oldPushState(...args)
        emit({type: 'User', name: 'pv', data: {
                ip,
                'url': window.location.href
            }})
    }
    // history.pushState()
    // history.replaceState()
}


export {initUser}