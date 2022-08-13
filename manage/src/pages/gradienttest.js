import { Col, Row, List, Checkbox, Card } from 'antd';
import MyList from "@components/list";
import {
    HttpDoubleBarsChartWithDifferentTime,
    HttpDoubleLinesChartWithDifferentTime,
    HttpPieChartWithErrorType
} from "@components/http";
import { useFakerErrorList } from '@utils/hooks/faker';
const App = () => {
    const data=useFakerErrorList(5);
    return (
        <>
            <Row>
                <Col xs={24} lg={24}>
                    <HttpDoubleLinesChartWithDifferentTime width={1250} height={300} />
                </Col>
            </Row>
            <Row>
                <Col xs={24} lg={24}>
                    <MyList data={data} />
                </Col>
            </Row>
        </>
    )
}

export default App;