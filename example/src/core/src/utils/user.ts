/**
 * todo: 这里面的每一个函数都应该只调用一次，应该考虑封装成context或为数据设置一个缓存
 *
 */

export const getUserAgent = function (): string {
    return window.navigator.userAgent
}
// todo:无法获得真实使用的浏览器
export const getBrowserInfo = () => {
    const ua= navigator.userAgent;
    let tem;
    let M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
}

export const getPlatform = () => {
    // @ts-ignore
    return window.navigator.userAgentData.platform
}


const IPIFY_ENDPOINT_IPV6 = 'https://api.ipify.org?format=json';

export async function ipify() {
    return fetch(IPIFY_ENDPOINT_IPV6)
        .then(response => response.json())
}