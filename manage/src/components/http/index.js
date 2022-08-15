/**
 * 这里放展示有关http数据的组件
 */

import Chart from "@components/charts";
import { useFakerColorArr, useFakerLoading, useFakerOclockTimeArrByOrder, useFakerRandomNumArrByOclock } from "@utils/hooks/faker";
import { useFakerNumArrByOrderLen } from "@utils/hooks";
import { errorType, useGetErrorData, waitTime } from "src/store";

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
 * 在不同时段请求成功和请求错误多条形折线图
 */
export const HttpLinesChartWithDifferentTime = ({ width = 1000, height = 400, Linenums = 2 }) => {
    const time = 1500, initLength = 10;
    const timeArr = useFakerOclockTimeArrByOrder(initLength, time),
        nums = useFakerRandomNumArrByOclock(initLength, time, Linenums),
        colors = useFakerColorArr(2),
        isLoading = useFakerLoading(time);
    return <Chart
        isLoading={isLoading}
        width={width}
        height={height}
        autoResize={true}
        option={{
            title: {
                left: 'center',
                text: '这里是每种具体错误的错误代码在不同时段的数量'
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
                    name: `错误类型：${index}`,
                    emphasis: {
                        //高亮指定线
                        focus: 'series'
                    },
                    smooth: true,
                };
            }),
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
