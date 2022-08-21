import { Col, Row } from 'antd';
import { HttpLinesChartWithDifferentTime } from "@components/http";
import _List from '@components/errorList';
import { errorUrlsLen, errorResourceUrls, errorResourceTypes } from 'src/store';
const App = () => {
    const data = Array.from({ length: errorUrlsLen }, (_, index) => {
        return {
            errorType: errorResourceTypes[index],
            errorUrl: errorResourceUrls[index],
            errorReason: '还没写'
        }
    })
    return (
        <>
            <Row>
                <Col xs={24} lg={24}>
                    <HttpLinesChartWithDifferentTime height={300} initLength={15} errorType='resourceError' />
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