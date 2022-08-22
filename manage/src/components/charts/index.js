import { useInitCharts, useOptionsCharts } from "@utils/hooks/charts";
import { useFakerLoading } from '@utils/hooks/faker';
import { Fetchtime, waitTime } from 'src/store';
import { useFakerNumArrByOrderLen } from '@utils/hooks';
const Chart = (props) => {
    const { isLoading = false, height = 100, option = {}, isDark = true, ...resProps } = props;
    const chartRef = useInitCharts(option,isDark);
    useOptionsCharts(chartRef, option, isLoading,isDark);
    return <div style={{
        height: `${height}px`,
    }} ref={chartRef}></div>
}

export default Chart;

export const PagePieChart = ({ title='数据展示',height = 500, segements = ['0'] }) => {
    const isLoading = useFakerLoading(waitTime),
        data = useFakerNumArrByOrderLen(segements.length, Fetchtime);
    return <Chart
        isLoading={isLoading}
        height={height}
        isDark={false}
        option={{
            title: {
                left: 'center',
                text: title,
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