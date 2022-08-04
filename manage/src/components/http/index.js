/**
 * 这里放展示有关http数据的组件
 */

import { LineChart } from "@components/charts/lines";
import { PieChart } from "@components/charts/pies";
import { useFakerColorArr, useFakerLoading, useFakerNumArr, useFakerNumArrByOrderLen, useFakerOclockTimeArr, useFakerRandomNumArr } from "@utils/hooks/faker";


/**
 * 在不同时段请求成功和请求错误的双条形图
 */

export const HttpDoubleBarsChartWithDifferentTime = ({ width = 1000, height = 400 }) => {
    const time = 2000, initLength = 4;
    const timeArr = useFakerOclockTimeArr(initLength, time * 10000),
        nums = useFakerRandomNumArr(initLength, time * 10000, 2),
        colors = useFakerColorArr(2),
        isLoading = useFakerLoading(time),
        names = ['成功', '失败'];
    return <LineChart
        isLoading={isLoading}
        width={width}
        height={height}
        option={{
            title: {
                left: "center",
                text: '不同时段http请求数量',
            },
            xAxis: {},
            yAxis: {
                type: 'category',
                data: timeArr,
                inverse: true,
                animationDuration: 300,
                animationDurationUpdate: 300,
            },
            tooltip: {
                trigger: 'axis'
            },
            series: nums.map((value, index) => {
                return {
                    realtimeSort: true,
                    type: 'bar',
                    data: value.map((item) => {
                        return {
                            value: item,
                            itemStyle: {
                                color: colors[index],
                            }
                        }
                    }),
                    label: {
                        show: true,
                        valueAnimation: true
                    },
                    color: colors[index],
                    name: `请求${names[index]}的数量`,
                    emphasis: {
                        //高亮指定线
                        focus: 'series'
                    },
                }
            }),
            animationDuration: 1000,
            animationDurationUpdate: 1000,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear'
        }}

    />
}
/**
 * 在不同时段请求成功和请求错误双条形折线图
 */
export const HttpDoubleLinesChartWithDifferentTime = ({ width = 1000, height = 400 }) => {
    const time = 1500, initLength = 10;
    const timeArr = useFakerOclockTimeArr(initLength, time),
        nums = useFakerRandomNumArr(initLength, time, 2),
        colors = useFakerColorArr(2),
        isLoading = useFakerLoading(time),
        names = ['成功', '失败'];
    return <LineChart
        isLoading={isLoading}
        width={width}
        height={height}
        option={{
            title: {
                left: 'center',
                text: '实时http请求数量监控'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: timeArr
            },
            yAxis: {},
            series: nums.map((value, index) => {
                return {
                    type: 'line',
                    showSymbol: true,
                    data: value,
                    stack: 'x',
                    color: colors[index],
                    name: `请求${names[index]}的数量`,
                    emphasis: {
                        //高亮指定线
                        focus: 'series'
                    },
                };
            }),
        }}

    />
}


/**
 * http请求错误类型的饼状图
 */
export const HttpPieChartWithErrorType = ({ width = 1000, height = 500 }) => {
    const time = 1500, initLength = 6;
    const data = useFakerNumArrByOrderLen(initLength, time),
        colors = useFakerColorArr(initLength),
        isLoading = useFakerLoading(time),
        names = ['js异常', 'vue异常', 'promise异常', 'react异常', '请求错误异常', '未定义异常'];

    return <PieChart
        isLoading={isLoading}
        width={width}
        height={height}
        option={{
            title: {
                left: 'center',
                text: '异常统计'
            },
            tooltip: {
                trigger: 'item',
                formatter:`{b}<br/>{c}条，占比{d}%`
            },
            series: {
                type: 'pie',
                radius: [50, 250],
                selectedMode: 'single',
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 8
                },
                data:data.map((value,index)=>{
                    return{
                        value,
                        name:names[index]
                    }
                })
            }
        }}
    />
}
