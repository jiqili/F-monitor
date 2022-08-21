/**
 * 存放数据的地方
 */
import { useContext, createContext } from "react";
import { useFakerNumArrByOrderLen, UseFakerRandomIndexArr, UseFakerUrlsArrByOrderLen } from "@utils/hooks";

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
export const Fetchtime = 1000*60*15;
/**
 * 主机名
 */
export const host = `http:127.0.0.1:80`;


const JSERRORTYPES = ['RangeError', 'ReferenceError', 'SyntaxError', 'TypeError'],
    RESOURCEERRORTYPES = ['Script Load Error', 'Image Load Error'],
    HTTPERRORTYPES = ['Not Found', 'Internal Server Error'];

/**
 * js错误
 */
export const errorUrlsLen = 5,
    errorJsUrls = UseFakerUrlsArrByOrderLen(errorUrlsLen),
    errorJsTypes = UseFakerRandomIndexArr(errorUrlsLen, JSERRORTYPES);

/**
 * resource错误
 */
export const errorResourceUrls = UseFakerUrlsArrByOrderLen(errorUrlsLen),
    errorResourceTypes = UseFakerRandomIndexArr(errorUrlsLen, RESOURCEERRORTYPES);

/**
 * http请求错误
 */
export const errorHttpUrls = UseFakerUrlsArrByOrderLen(errorUrlsLen),
    errorHttpTypes = UseFakerRandomIndexArr(errorUrlsLen, HTTPERRORTYPES);


const USERPERFORMANCE = ['pv', 'uv'];

const PERFORMANCETYPE=['fp','fcp','domReady'];
/**
 * 网络请求项
 */
export const performanceHttpRequestTypes=['GET','POST','PUT','DELETE','OPTIONS'];

const DataProvider = ({ children }) => {
    const errorArray = useFakerNumArrByOrderLen(errorType.length, Fetchtime);
    const userArray = useFakerNumArrByOrderLen(USERPERFORMANCE.length, Fetchtime);
    return (
        <dataContext.Provider value={{ errorArray, userArray }}>
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
 * 获取uv，pv
 */
export const useGetUserData = (usertype) => {
    const { userArray } = useContext(dataContext);
    return USERPERFORMANCE.includes(usertype) ? userArray[errorType.indexOf(usertype)] : userArray;
}