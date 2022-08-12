import {emit} from "../emit";

/*
* PV UV 自定义行为埋点 页面停留时间 用户热点页面
* */
const initUser = () => {
    emit({type: 'User', name: 'pv', data: {
            'user': document.cookie.split('=')[1],
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
        emit({
            type: 'User', name: 'pv', data: {
                'user': document.cookie.split('=')[1],
                'url': window.location.href
            }
        })
    })
    const oldPushState = window.history.pushState.bind(window.history);
    window.history.pushState = (...args) => {
        oldPushState(...args)
        emit({type: 'User', name: 'pv', data: {
                'user': document.cookie.split('=')[1],
                'url': window.location.href
            }})
    }
    // history.pushState()
    // history.replaceState()
}


export {initUser}