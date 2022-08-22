import SearchList from "@components/searchList";
/**
 * 这些页面主要是看占比，比如fp在某个范围占比最多，从中得出一般结论，然后在下面再给出日志
 */
const App = () => {
    return (
        <>
            <BottomList />
        </>
    )
}


import { UseFakerDateTimeArray, UseFakerNumArray, UseFakerRandomIndexArr, UseFakerUrlsArrByOrderLen, UseFakerUUIDArray } from "@utils/hooks";
import { performanceHttpRequestTypes } from "src/store";

const BottomList = () => {
    const initlen = 30;
    const requestTimeArr = UseFakerDateTimeArray(initlen),
        requestPathArr = UseFakerUrlsArrByOrderLen(initlen),
        requestResTimeArr = UseFakerNumArray(initlen),
        uuidArr = UseFakerUUIDArray(initlen),
        requestTypeArr = UseFakerRandomIndexArr(initlen, performanceHttpRequestTypes),
        statusArr = UseFakerRandomIndexArr(initlen, ['success', 'faild']);
    return (
        <>
            <SearchList
                headerArray={['请求时间', '请求路径', '响应时间', '方法', '状态']}
                data={Array.from({ length: initlen }, (_, index) => {
                    return {
                        uuid: uuidArr[index],
                        renderArray: [
                            requestTimeArr[index],
                            requestPathArr[index],
                            requestResTimeArr[index],
                            requestTypeArr[index],
                            statusArr[index]
                        ]
                    }
                })}
            />
        </>
    )
}




export default App;