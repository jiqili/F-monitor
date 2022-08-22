/**
 * 存放数据的地方
 */
import { useContext, createContext } from "react";
import { useFakerNumArrByOrderLen, UseFakerRandomIndexArr, UseFakerRandomReason, UseFakerUrlsArrByOrderLen } from "@utils/hooks";
import {useFetchOnceData} from "@utils/hooks/fetch";


const dataContext = createContext({});

/**
 * 异常数据，包括js异常、promise异常、其他异常（console）、react异常、资源请求异常和http请求异常
 */
export const errorType = ['js异常', 'promise异常', '资源请求错误', 'react异常', 'http请求错误', '其他异常'];
/**
 * 加载时间
 */
export const waitTime = 1000;
/**
 * 间隔获取时间
 */
export const Fetchtime = 1000 * 60 * 15;
/**
 * 主机名
 */
export const host = `http:127.0.0.1:80`;


const JSERRORTYPES = ['RangeError', 'ReferenceError', 'SyntaxError', 'TypeError'],
    RESOURCEERRORTYPES = ['Script Load Error', 'Image Load Error'],
    HTTPERRORTYPES = ['Not Found', 'Internal Server Error'],
    ERRORREASONS = new Map([
        ['RangeError', [
            ` The argument must be between -500 and 500.
            at check (<anonymous>:5:15)
            at <anonymous>:11:5`,
            `The argument must be an "apple", "banana", or "carrot".
            at check (<anonymous>:5:15)
            at <anonymous>:11:5`
        ]],
        ['ReferenceError', [
            `adddlert is not defined
            at <anonymous>:2:3`,
            `fn is not defined
            at check (<anonymous>:5:15)
            at <anonymous>:11:5`
        ]],
        ['SyntaxError', [
            `Invalid or unexpected token`
        ]],
        ['TypeError', [
            ` Cannot read properties of null (reading 'f')
            at <anonymous>:2:8`,
            ` Cannot read properties of undefined (reading 'f')
            at <anonymous>:10:37`
        ]],
        ['Script Load Error', [
            `Failed to load resource: net::ERR_CONNECTION_REFUSED`,
            `Failed to load resource: ERR_NAME_NOT_RESOLVED`
        ]],
        ['Image Load Error', [
            `Failed to load resource: net::ERR_CONNECTION_REFUSED`,
            `Failed to load resource: ERR_NAME_NOT_RESOLVED`
        ]],
        ['Not Found', [
            `cannot find this page`
        ]],
        ['Internal Server Error', [
            `Internal Server Error`
        ]]
    ]);
    // console.log({ERRORREASONS});

/**
 * js错误
 */
export const errorUrlsLen = 3,
    errorJsUrls = UseFakerUrlsArrByOrderLen(errorUrlsLen),
    errorJsTypes = UseFakerRandomIndexArr(errorUrlsLen, JSERRORTYPES),
    errorJsReasons = UseFakerRandomReason(errorJsTypes, ERRORREASONS);

/**
 * resource错误
 */
export const errorResourceUrls = UseFakerUrlsArrByOrderLen(errorUrlsLen),
    errorResourceTypes = UseFakerRandomIndexArr(errorUrlsLen, RESOURCEERRORTYPES),
    errorResourceReasons = UseFakerRandomReason(errorResourceTypes, ERRORREASONS);

/**
 * http请求错误
 */
export const errorHttpUrls = UseFakerUrlsArrByOrderLen(errorUrlsLen),
    errorHttpTypes = UseFakerRandomIndexArr(errorUrlsLen, HTTPERRORTYPES),
    errorHttpReasons = UseFakerRandomReason(errorHttpTypes, ERRORREASONS);


const USERPERFORMANCE = ['pv', 'uv'];

const PERFORMANCETYPE = ['fp', 'fcp', 'domReady'];
/**
 * 网络请求项
 */
export const performanceHttpRequestTypes = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];

const DataProvider = ({ children }) => {
    const errorArray = useFakerNumArrByOrderLen(errorType.length, Fetchtime);
    const onceData=useFetchOnceData();
    return (
        <dataContext.Provider value={{ errorArray,onceData }}>
            {children}
        </dataContext.Provider>
    )
}
export default DataProvider;

/**
 * 下面仿照redux的slice
 */
/**
 * 异常数据，包括js异常、promise异常、其他异常（console）、react异常、资源请求异常和http请求异常
 */
export const useGetErrorData = (errortype) => {
    const { errorArray } = useContext(dataContext);
    return errorType.includes(errortype) ? errorArray[errorType.indexOf(errortype)] : errorArray;
}
/**
 * 获取uv，pv,浏览器
 */
export const useGetPVUVBROWSERData=()=>{
    const {onceData}=useContext(dataContext);
    const {pv=10,uv=10,browsers=[
        {'browsers':'chrome','number':12},
        {'browsers':'firefox','number':12},
    ]}=onceData;
    return {pv,uv,browsers};
}

//获取错误数量
export const useGetResourceErrorNum=()=>{
    const {onceData}=useContext(dataContext);
    const {errorResourceNum=0,errorNum=0}=onceData;
    return {errorResourceNum,errorNum}
}