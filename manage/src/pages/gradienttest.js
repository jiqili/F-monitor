import React, { PureComponent, useEffect, useState } from "react";
import { SmoothLineChart } from "@components/charts/lines";



const App = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([["2019-08-3", 116], ["2020-08-3", 12], ["2021-08-3", 15]]);
    useEffect(() => {
        //模拟网络请求
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        let timer=setInterval(()=>{
            setData((data)=>{
                return [...data,["2022-08-3",Math.floor(Math.random()*120)]];
            });
        },1000);
        return ()=>clearInterval(timer);
    }, []);
    return <SmoothLineChart
        isLoading={isLoading}
        width={1000}
        height={500}
        option={{
            visualMap: {
                show: false,
                type: 'continuous',
            },
            title: {
                left: 'center',
                text: 'Gradient along the y axis'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: data.map(item => { return item[0] }),
            },
            yAxis: {},

            series: {
                type: 'line',
                //是否显示具体数据点
                showSymbol: false,
                data: data.map(item => { return item[1] }),
            }
        }}
    />
}

export default App;