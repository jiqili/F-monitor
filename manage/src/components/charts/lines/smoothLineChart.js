import { useInitCharts, useOptionsCharts } from "@utils/hooks/charts";
const Index=(props)=>{
    const {  isLoading=true,width = 400, height = 400, option={},...resProps } = props;
    const chartRef=useInitCharts({width,height});
    useOptionsCharts(chartRef,option,isLoading);
    return <div ref={chartRef}></div>
}
export default Index;