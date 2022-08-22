import { Col, Row } from 'antd';
import { HttpLinesChartWithDifferentTime } from "@components/http";
import _List from '@components/errorList';
import { errorUrlsLen, errorHttpUrls, errorHttpTypes, errorHttpReasons } from 'src/store';
import { useFetchAnyWayData } from '@utils/hooks/fetch';
import { FetchHTTPErrors } from '@utils/fetch';

const App = () => {
    const data = Array.from({ length: errorUrlsLen }, (_, index) => {
        return {
            errorType: errorHttpTypes[index],
            errorUrl: errorHttpUrls[index],
            errorReason: errorHttpReasons[index]
        }
    });
    const time = new Date();
    const FetchData = useFetchAnyWayData(FetchHTTPErrors, time.getTime() - 3 * 60 * 60, time.getTime()).sort((a, b) => b.timeStamp - a.timeStamp);
    return (
        <>
            <Row>
                <Col xs={24} lg={24}>
                    <HttpLinesChartWithDifferentTime height={300} initLength={15} errorType='httpError' />
                </Col>
            </Row>
            <Row>
                <Col xs={24} lg={24}>
                    <_List data={data} fetchList={Array.from(FetchData, ({ name, requestUrl, browser, requestMethod, stack = [] }) => {
                        return {
                            errorType: name,
                            errorUrl: requestUrl,
                            errorReason: `${browser} Method:${requestMethod}`,
                            codeLine: `${stack.map(item => `${item.originLine}  ${item.source}`).join('\n')}`
                        }
                    })} />

                </Col>
            </Row>
        </>
    )
}







export default App;