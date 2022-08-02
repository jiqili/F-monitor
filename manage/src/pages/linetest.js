import LineChart from "@components/charts/LineChart";
import { useEffect, useState } from "react";


export default function App(){
    const [state, setState] = useState({
        lineChartData: {
            //折线图模拟数据
            xData: [
                "2016/08/13",
                "2017/08/14",
                "2018/08/15",
                "2019/08/16",
                "2020/08/17",
                "2021/08/18",
            ],
            seriesData: [22, 19, 88, 66, 5, 90],
        },
    });
    useEffect(()=>{
        let timer=null;
        let year=2021;
        const handerSetState=(state)=>{
            return{
                lineChartData: {
                    xData: [...state.lineChartData.xData, `${year++}/08/02`],
                    seriesData: [...state.lineChartData.seriesData, Math.floor(Math.random() * 100)],
                }
            }
        }
        timer=setInterval(()=>{
            setState(handerSetState)
        },1000);

        return ()=>clearInterval(timer);
    },[]);
    return (
        <LineChart
            title="折线图模拟数据"
            xData={state.lineChartData.xData}
            seriesData={state.lineChartData.seriesData}
            width={1000}
        />
    );
}