import { Col, Row } from 'antd';
import Chart from '@components/charts';
import { useFakerLoading } from '@utils/hooks/faker';
import SearchList from "@components/searchList";
import { Fetchtime, waitTime } from 'src/store';
import { useFakerNumArrByOrderLen } from '@utils/hooks';
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

const PagePieChart = ({ height = 500, segements = ['0'] }) => {
    const isLoading = useFakerLoading(waitTime),
        data = useFakerNumArrByOrderLen(segements.length, Fetchtime);
    return <Chart
        isLoading={isLoading}
        height={height}
        isDark={false}
        option={{
            title: {
                left: 'center',
                text: '数据统计',
                color: "white"
            },
            tooltip: {
                trigger: 'item',
                formatter: `范围 {b}<br/>{c}条，占比{d}%`
            },
            series: {
                type: 'pie',
                radius: [0, 120],
                selectedMode: 'single',
                data: data.map((value, index) => {
                    return {
                        value,
                        name: segements[index],
                        label: {
                            fontSize: 16,
                            fontWeight: 'bold'
                        }
                    }
                })
            }
        }}
    />
}




export default App;