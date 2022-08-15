import { useInitCharts, useOptionsCharts } from "@utils/hooks/charts";
export const LineChart=(props)=>{
    const {  isLoading=false,width = 400, height = 400, option={},...resProps } = props;
    const chartRef=useInitCharts({width,height});
    useOptionsCharts(chartRef,option,isLoading);
    return <div ref={chartRef}></div>
}