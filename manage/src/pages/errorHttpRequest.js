import { Col, Row } from 'antd';
import { HttpLinesChartWithDifferentTime } from "@components/http";
import _List from '@components/errorList';
import { errorUrlsLen,errorHttpUrls,errorHttpTypes } from 'src/store';

const App = () => {
    const data = Array.from({ length: errorUrlsLen }, (_, index) => {
        return {
            errorType: errorHttpTypes[index],
            errorUrl: errorHttpUrls[index],
            errorReason: '还没写'
        }
    })
    return (
        <>
            <Row>
                <Col xs={24} lg={24}>
                    <HttpLinesChartWithDifferentTime height={300} initLength={12} errorType='httpError' />
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