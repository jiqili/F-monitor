import { useInitCharts, useOptionsCharts } from "@utils/hooks/charts";
export const PieChart = (props) => {
    const { isLoading = false, width = 400, height = 400, option = {},autoResize=false, ...resProps } = props;
    const chartRef = useInitCharts({ width, height,autoResize });
    useOptionsCharts(chartRef, option, isLoading);
    return <div style={{
        height:`${height}px`,
    }} ref={chartRef}></div>
}
