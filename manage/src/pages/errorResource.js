import { Col, Row} from 'antd';
import { HttpLinesChartWithDifferentTime } from "@components/http";
import { useFakerErrorList } from '@utils/hooks/faker';
import _List from '@components/errorList';

const App = () => {
    const nums = 5;
    const data = useFakerErrorList(nums);
    return (
        <>
            <Row>
                <Col xs={24} lg={24}>
                    <HttpLinesChartWithDifferentTime width={1250} height={300} Linenums={nums} />
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