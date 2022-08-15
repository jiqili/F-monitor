import { useInitCharts, useOptionsCharts } from "@utils/hooks/charts";
const Chart = (props) => {
    const { isLoading = false, height = 100, option = {}, ...resProps } = props;
    const chartRef = useInitCharts(option);
    useOptionsCharts(chartRef, option, isLoading);
    return <div style={{
        height: `${height}px`,
    }} ref={chartRef}></div>
}

export default Chart;