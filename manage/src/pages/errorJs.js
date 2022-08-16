import { Col, Row } from 'antd';
import { HttpLinesChartWithDifferentTime } from "@components/http";
import _List from '@components/errorList';
import { errorUrlsLen, errorJsUrls, errorJsTypes } from 'src/store';
const App = () => {
    const data = Array.from({ length: errorUrlsLen }, (_, index) => {
        return {
            errorType: errorJsTypes[index],
            errorUrl: errorJsUrls[index],
            errorReason: '还没写'
        }
    })
    return (
        <>
            <Row>
                <Col xs={24} lg={24}>
                    <HttpLinesChartWithDifferentTime height={300} initLength={100} errorType='jsError' />
                </Col>
            </Row>
            <Row>
                <Col xs={24} lg={24}>
                    <_List data={data} />
                </Col>
            </Row>
        </>
    )
}







export default App;