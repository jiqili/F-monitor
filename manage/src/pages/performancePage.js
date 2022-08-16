import { Col, Row } from 'antd';
import SearchList from "@components/searchList";
import { PagePieChart } from '@components/charts';
/**
 * 这些页面主要是看占比，比如fp在某个范围占比最多，从中得出一般结论，然后在下面再给出日志
 */
const App = () => {
    return (
        <>
            {/* 头部三张图 */}
            <Row gutter={8} align={'middle'}>
                {/* 这里放dns饼图 */}
                <Col xs={24} lg={8} xl={8}>
                    <PagePieChart height={300} segements={['0-100', '101-150', '151-200']} />
                </Col>
                {/* 这里放fp饼图 */}
                <Col xs={24} lg={8} xl={8}>
                    <PagePieChart height={300} segements={['0-100', '101-150', '151-200']} />
                </Col>
                {/* 这里放fcp饼图 */}
                <Col xs={24} lg={8} xl={8}>
                    <PagePieChart height={300} segements={['0-100', '101-150', '151-200']} />
                </Col>
            </Row>
            <SearchList />
        </>
    )
}






export default App;