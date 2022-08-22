import api from "@utils/api";


//post方法请求头
const _POSTHeader = ({ start = 1661081655022, end = 1661081690123 }, ...resProps) => {
    return {
        method: 'POST',
        body: new URLSearchParams({ start, end })
    }
}

//获取所有错误列表
export const FetchAllErrors = async (start = 1661081655022, end = 1661081667408) => {
    const resNoJSON = await fetch(api.getNoneResourceError, _POSTHeader({ start, end }));
    const res = await resNoJSON.json();
    return res;
}

//获取资源错误
export const FetchResourceErrors = async (start = 1661079148116, end = 1661081690123) => {
    const resNoJSON = await fetch(api.getResourceError, _POSTHeader({ start, end }));
    const res = await resNoJSON.json();
    return res;
}

//获取http请求错误
export const FetchHTTPErrors = async (start = 1661079148116, end = 1661081690123) => {
    const resNoJSON = await fetch(api.getHTTPError, _POSTHeader({ start, end }));
    const res = await resNoJSON.json();
    return res;
}


//获取Http请求成功率
export const FetchHTTPSuccessRate = async (start = 1661079148116, end = 1661081690123) => {
    const resNoJSON = await fetch(api.getSuccessRate, _POSTHeader({ start, end }));
    const res = await resNoJSON.json();
    return res;
}

//获取pv
export const FetchPV = async (start = 1661079148116, end = 1661081690123) => {
    const resNoJSON = await fetch(api.getPV, _POSTHeader({ start, end }));
    const res = await resNoJSON.json();
    return res;
}


//获取uv
export const FetchUV = async (start = 1661079148116, end = 1661081690123) => {
    const resNoJSON = await fetch(api.getUV, _POSTHeader({ start, end }));
    const res = await resNoJSON.json();
    return res;
}

//获取常用浏览器
export const FetchPopularBrowsers = async () => {
    const resNoJSON = await fetch(api.getPopularBrowser);
    const res = await resNoJSON.json();
    return res;
}

//获取用户数据
export const FetchPerformanceData = async (start = 1661079148116, end = 1661081690123) => {
    const resNoJSON = await fetch(api.getData, _POSTHeader({ start, end }));
    const res = await resNoJSON.json();
    return res;
}