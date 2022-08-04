import { getPlatform, getUserAgent, ipify} from "../utils/user";

/*
* PV UV 自定义行为埋点 页面停留时间 用户热点页面
* */
const userAgent = getUserAgent()
console.log(window.navigator)
console.log(getPlatform())
document.cookie = "11"
console.log(document.cookie)
// console.log(getIP());
const initUser = async () => {
    const {ip} = await ipify()
    console.log(ip)
}



export {initUser}