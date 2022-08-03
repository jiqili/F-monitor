import { useInitCharts, useOptionsCharts } from "@utils/hooks/charts";
const Index = (props) => {
    const { title, isLoading=true,xData, seriesData, width = 400, height = 400, ...resProps } = props;
    const chartRef=useInitCharts({width,height});
    useLoadingAnamationCharts(chartRef,isLoading);
    useEffect(() => {
        let chart = echarts.getInstanceByDom(chartRef.current);
        //加上isloading添加过度动画
        if(isLoading){
            return;
        }
        let option = {  //配置项(数据都来自于props)
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: xData,
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: seriesData,
                type: 'line'
            }]
        };
        chart.setOption(option);
    }, [props]);

    return <div ref={chartRef} ></div>
}

export default Index;