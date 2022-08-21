import styles from "./segementsCharts.module.css";
import { Col, Row, Card } from 'antd';
import { DataSmoothLineChart } from "@components/http";
import { useFakerOclockTimeArrByOrder, useFakerTimePassingArr } from "@utils/hooks";
import { Fetchtime } from "src/store";
import { PagePieChart } from "@components/charts";
export function SegementsChartsHeader({ title, children }) {
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
                    <UserPerformanceCharts />
                </Card>
            </Col>
        </SegementsChartsHeader>
    )
}


const UserPerformanceCharts = () => {
    const arr_len = 30;
    const Xarr = useFakerOclockTimeArrByOrder(arr_len, Fetchtime),
        dnsArr = useFakerTimePassingArr(arr_len, Fetchtime, { min: 0, max: 20, precision: 2 }),
        domParse = useFakerTimePassingArr(arr_len, Fetchtime, { min: 43, max: 70, precision: 5 }),
        domReady = useFakerTimePassingArr(arr_len, Fetchtime, { min: 21, max: 70, precision: 3 });

    return (
        <DataSmoothLineChart
            xdata={Xarr}
            ydata={[dnsArr, domParse, domReady]}
            typedata={['dns', 'domParse 单位10ms', 'domReady 单位10ms']}
            height={300}
            title={'dns dom解析等'}
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
    const arr_len = 10, maxPlus = 10;
    const Xarr = useFakerOclockTimeArrByOrder(arr_len, Fetchtime),
        Yarr_1 = useFakerTimePassingArr(arr_len, Fetchtime, maxPlus),
        Yarr_2 = useFakerTimePassingArr(arr_len, Fetchtime, maxPlus);

    return (
        <DataSmoothLineChart
            xdata={Xarr}
            ydata={[Yarr_1, Yarr_2]}
            typedata={['fp', 'fcp']}
            title={'fp fcp'}
            height={300}
        />
    )
}
