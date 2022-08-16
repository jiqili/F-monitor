import { useInitCharts, useOptionsCharts } from "@utils/hooks/charts";
const Chart = (props) => {
    const { isLoading = false, height = 100, option = {}, isDark = true, ...resProps } = props;
    const chartRef = useInitCharts(option,isDark);
    useOptionsCharts(chartRef, option, isLoading,isDark);
    return <div style={{
        height: `${height}px`,
    }} ref={chartRef}></div>
}

export default Chart;