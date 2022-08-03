import React, { PureComponent } from "react";
import { LineChart } from "@components/charts/lines";
export default class App extends PureComponent {
    state = {
        lineChartData: {
            isLoading: true,
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
    };
    timer = null;
    year = 2022;
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                lineChartData: {
                    isLoading: false,
                    xData: [...this.state.lineChartData.xData, `${this.year++}/08/02`],
                    seriesData: [...this.state.lineChartData.seriesData, Math.floor(Math.random() * 100)],
                }
            })
        }, 2000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    render() {
        return (
            <LineChart
                option={{
                    title: {
                        text: "折线图模拟数据"
                    },
                    xAxis: {
                        type: 'category',
                        data: this.state.lineChartData.xData,
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: {
                        data: this.state.lineChartData.seriesData,
                        type: 'line'
                    }
                }}
                width={1000}
                isLoading={this.state.lineChartData.isLoading}
            />
        );
    }
}