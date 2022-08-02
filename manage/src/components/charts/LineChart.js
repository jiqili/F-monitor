import React, { useEffect, useRef } from 'react';
import * as echarts from "echarts";

const Index = (props) => {
    const { title, xData, seriesData, width = 400, height = 400, ...resProps } = props;
    const chartRef = useRef(null);  //拿到DOM容器
    useEffect(() => {
        let chart = echarts.getInstanceByDom(chartRef.current);
        if (!chart) {
            chart = echarts.init(chartRef.current, null, {
                height, width,
            });
            //echart初始化容器
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
    useEffect(()=>{
        let chart=echarts.getInstanceByDom(chartRef.current);
        return ()=>chart.dispose();
    },[]);

    return <div ref={chartRef} ></div>
}

export default Index;