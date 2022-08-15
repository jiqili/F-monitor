/**
 * 存放数据的地方
 */
import { useContext, useState, createContext } from "react";
import { useFakerNumArrByOrderLen } from "@utils/hooks";

const dataContext = createContext({errorArray:[]});

/**
 * 异常数据，包括js异常、promise异常、其他异常（console）、react异常、资源请求异常和http请求异常
 */
export const errorType = ['js异常', 'promise异常', '资源请求错误', 'react异常', 'http请求错误', '其他异常'];
/**
 * 加载时间
 */
export const waitTime=1000;

const time=5000;

const DataProvider = ({ children }) => {
    const errorArray = useFakerNumArrByOrderLen(errorType.length,time);
    return (
        <dataContext.Provider value={{errorArray}}>
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