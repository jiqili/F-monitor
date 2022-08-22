import { Col, Row } from 'antd';
import { HttpLinesChartWithDifferentTime } from "@components/http";
import _List from '@components/errorList';
import { errorUrlsLen, errorResourceUrls, errorResourceTypes,errorResourceReasons } from 'src/store';
import { useFetchAnyWayData } from '@utils/hooks/fetch';
import { FetchResourceErrors } from '@utils/fetch';
const App = () => {
    const data = Array.from({ length: errorUrlsLen }, (_, index) => {
        return {
            errorType: errorResourceTypes[index],
            errorUrl: errorResourceUrls[index],
            errorReason: errorResourceReasons[index],
        }
    })
    const time=new Date();
    const FetchData=useFetchAnyWayData(FetchResourceErrors,time.getTime()-3*60*60, time.getTime()).sort((a,b)=>b.timeStamp-a.timeStamp);
    return (
        <>
            <Row>
                <Col xs={24} lg={24}>
                    <HttpLinesChartWithDifferentTime height={300} initLength={15} errorType='resourceError' />
                </Col>
            </Row>
            <Row>
                <Col xs={24} lg={24}>
                    <_List data={data} fetchList={Array.from(FetchData,({reason,url})=>{
                        return {
                            errorType:reason,
                            errorUrl:url,
                            errorReason:reason,
                        }
                    })} />

                </Col>
            </Row>
        </>
    )
}







export default App;