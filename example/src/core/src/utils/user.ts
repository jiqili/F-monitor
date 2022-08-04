/**
 * 获得用户浏览器信息
 * @return 用户的浏览器信息
 */
export const getUserAgent = function (): string {
    return window.navigator.userAgent
}

export const getPlatform = () => {
    // @ts-ignore
    return window.navigator.userAgentData.platform
}


const IPIFY_ENDPOINT_IPV6 = 'https://api.ipify.org?format=json';



export async function ipify() {
    fetch(IPIFY_ENDPOINT_IPV6)
        .then(response => response.json())
        .then(data => console.log(data));
}