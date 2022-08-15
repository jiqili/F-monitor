import { Col, Row, List, Checkbox, Card } from 'antd';
import styles from "./css/errorJs.module.css";
import { HttpLinesChartWithDifferentTime } from "@components/http";
import { useFakerErrorList } from '@utils/hooks/faker';
const App = () => {
    const nums=5;
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
                    <MyList data={data} />
                </Col>
            </Row>
        </>
    )
}

function MyList({ data }) {
    return (
        <List
            dataSource={data}
            renderItem={(item) =>
                <List.Item
                    key={item.id}
                >
                    <Card
                        className={styles.card}
                    >
                        <div className={styles.card_errorType}>
                            <Checkbox />
                            <p>{`错误类型：${item.id}`}</p>
                        </div>
                        <p>{item.errorMsg}</p>
                    </Card>
                </List.Item>}
        />
    )
}




export default App;