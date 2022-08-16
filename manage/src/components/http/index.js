/**
 * 这里放展示有关http数据的组件
 */

import Chart from "@components/charts";
import { useFakerColorArr, useFakerLoading } from "@utils/hooks/faker";
import { useFakerNumArrByOrderLen, useFakerOclockTimeArrByOrder, useFakerTimePassingArr } from "@utils/hooks";
import { errorType, useGetErrorData, waitTime, Fetchtime } from "src/store";
/**
 * 在不同时段请求成功和请求错误的双条形图--bar
 */

export const HttpDoubleBarsChartWithDifferentTime = ({ width = 1000, height = 400 }) => {
    const time = 1000, initLength = 4;
    const timeArr = useFakerOclockTimeArrByOrder(initLength, time * 3),
        successArr = useFakerNumArrByOrderLen(initLength, time * 3),
        errorArr = useFakerNumArrByOrderLen(initLength, time * 3),
        colors = useFakerColorArr(2),
        isLoading = useFakerLoading(time),
        names = ['成功', '失败'];
    return <Chart
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
                // inverse: true,
                animationDuration: time,
                animationDurationUpdate: time,
            },
            tooltip: {
                trigger: 'axis'
            },
            series: [
                {
                    // realtimeSort: true,
                    type: 'bar',
                    data: successArr,
                    label: {
                        show: true,
                        position: 'right',
                        valueAnimation: true
                    },
                    color: colors[0],
                    name: `请求${names[0]}的数量`,
                    emphasis: {
                        //高亮指定线
                        focus: 'series'
                    },
                },
                {
                    // realtimeSort: true,
                    type: 'bar',
                    data: errorArr,
                    label: {
                        show: true,
                        position: 'right',
                        valueAnimation: true
                    },
                    color: colors[1],
                    name: `请求${names[1]}的数量`,
                    emphasis: {
                        //高亮指定线
                        focus: 'series'
                    },
                },
            ],
            animationDuration: time,
            animationDurationUpdate: time,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear'
        }}
    />
}
/**
 * 在不同时段具体错误类型的总数走势图
 */
export const HttpLinesChartWithDifferentTime = ({ height = 400, initLength = 10, errorType = 'jsError' }) => {
    const timeArr = useFakerOclockTimeArrByOrder(initLength, Fetchtime),
        nums = useFakerTimePassingArr(initLength, Fetchtime),
        isLoading = useFakerLoading(waitTime);
    return <Chart
        isLoading={isLoading}
        height={height}
        option={{
            title: {
                left: 'center',
                text: `${errorType} 错误数量时间图`
            },
            tooltip: {
                trigger: 'axis',
                formatter: `{a}在 {b} 时间出现 {c} 次`
            },
            xAxis: {
                data: timeArr
            },
            yAxis: {},
            series: [
                {
                    name: `${errorType}`,
                    type: 'line',
                    showSymbol: true,
                    smooth: true,
                    areaStyle: {},
                    emphasis: {
                        //高亮指定线
                        focus: 'series'
                    },
                    stack: 'x',
                    data: nums,
                }
            ],
        }}

    />
}


/**
 * http请求错误类型的饼状图
 */
export const HttpPieChartWithErrorType = ({ height = 500 }) => {

    const data = useGetErrorData('all'),
        isLoading = useFakerLoading(waitTime);
    return <Chart
        isLoading={isLoading}
        height={height}
        option={{
            title: {
                left: 'center',
                text: '异常统计',
                color: "white"
            },
            tooltip: {
                trigger: 'item',
                formatter: `{b}<br/>{c}条，占比{d}%`
            },
            series: {
                type: 'pie',
                radius: [50, 210],
                selectedMode: 'single',
                center: ['50%', '55%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 10,
                },
                data: data.map((value, index) => {
                    return {
                        value,
                        name: errorType[index],
                        label: {
                            fontSize: 16,
                            fontWeight: 'bold'
                        }
                    }
                })
            }
        }}
    />
}
