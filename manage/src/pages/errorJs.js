import { Col, Row } from 'antd';
import { HttpLinesChartWithDifferentTime } from "@components/http";
import _List from '@components/errorList';
import { errorUrlsLen, errorJsUrls, errorJsTypes, errorJsReasons } from 'src/store';
import { useFetchAnyWayData } from '@utils/hooks/fetch';
import { FetchAllErrors } from '@utils/fetch';
const App = () => {
    const data = Array.from({ length: errorUrlsLen }, (_, index) => {
        return {
            errorType: errorJsTypes[index],
            errorUrl: errorJsUrls[index],
            errorReason: errorJsReasons[index]
        }
    });
    const time = new Date();
    //默认查询三分钟内的
    const FetchData = useFetchAnyWayData(FetchAllErrors, time.getTime()-3*60*60, time.getTime()).filter(item=>item.name==='JS Error').sort((a, b) => b.timeStamp - a.timeStamp);
    return (
        <>
            <Row>
                <Col xs={24} lg={24}>
                    <HttpLinesChartWithDifferentTime height={300} initLength={15} errorType='jsError' />
                </Col>
            </Row>
            <Row>
                <Col xs={24} lg={24}>
                    <_List data={data} fetchList={Array.from(FetchData,({name,url,reason,code=[]})=>{
                        return {
                            errorType:name,
                            errorUrl:url,
                            errorReason:reason,
                            codeLine:`${code.map(item=>`${item.originLine}  ${item.source}`).join('\n')}`
                        }
                    })} />
                </Col>
            </Row>
        </>
    )
}







export default App;