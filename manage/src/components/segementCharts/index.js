import styles from "./segementsCharts.module.css";
import { Col, Row, Card } from 'antd';
import { DataSmoothLineChart } from "@components/http";
import { useFakerOclockTimeArrByOrder, useFakerTimePassingArr } from "@utils/hooks";
import { Fetchtime } from "src/store";
import { PagePieChart } from "@components/charts";
function SegementsChartsHeader({ title, children }) {
    return (
        <>
            <Row>
                <p className={styles.Title}>
                    {title}
                </p>
            </Row>
            <Row>
                {children}
            </Row>
        </>
    )
}

export const SegementsChartsWithUser = () => {
    return (
        <SegementsChartsHeader title={'用户行为数据监控'}>
            <Col span={24}>
                <Card>
                    <PVUVCharts />
                </Card>
            </Col>
        </SegementsChartsHeader>
    )
}


const PVUVCharts = () => {
    const Xarr = useFakerOclockTimeArrByOrder(50, Fetchtime),
        Yarr_1 = useFakerTimePassingArr(50, Fetchtime),
        Yarr_2 = useFakerTimePassingArr(50, Fetchtime);

    return (
        <DataSmoothLineChart
            xdata={Xarr}
            ydata={[Yarr_1, Yarr_2]}
            typedata={['pv', 'uv']}
            height={300}
        />
    )
}


export const SegementsChartsWithHost = () => {
    return (
        <SegementsChartsHeader title={'网站运行数据监控'}>
            <Col xs={24} lg={12}>
                <Card>
                    <FPFCPCharts />
                </Card>
            </Col>
            <Col xs={24} lg={12}>
                <Card>
                    <PagePieChart title={'网络请求时间(ms)'} height={300} segements={['0-100', '101-150', '151-200']} />
                </Card>
            </Col>
        </SegementsChartsHeader>
    )
}

const FPFCPCharts = () => {
    const Xarr = useFakerOclockTimeArrByOrder(50, Fetchtime),
        Yarr_1 = useFakerTimePassingArr(50, Fetchtime),
        Yarr_2 = useFakerTimePassingArr(50, Fetchtime);

    return (
        <DataSmoothLineChart
            xdata={Xarr}
            ydata={[Yarr_1, Yarr_2]}
            typedata={['fp', 'fcp']}
            height={300}
        />
    )
}
