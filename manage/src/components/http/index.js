/**
 * 这里放展示有关http数据的组件
 */

import Chart from "@components/charts";
import { useFakerLoading } from "@utils/hooks/faker";
import { useFakerOclockTimeArrByOrder, useFakerTimePassingArr } from "@utils/hooks";
import { errorType, useGetErrorData, waitTime, Fetchtime } from "src/store";


/**
 * 在不同时段具体错误类型的总数走势图
 */
export const HttpLinesChartWithDifferentTime = ({ height = 400, initLength = 10, errorType = 'jsError' }) => {
    const timeArr = useFakerOclockTimeArrByOrder(initLength, Fetchtime),
        nums = useFakerTimePassingArr(initLength, Fetchtime, { min: 0, max: 15, precision: 2 }),
        isLoading = useFakerLoading(waitTime);
    return <Chart
        isLoading={isLoading}
        height={height}
        option={{
            visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: -10,
                max: 15
            }],
            title: {
                left: 'center',
                text: `${errorType} 错误数量时间图`
            },
            tooltip: {
                trigger: 'axis',
                formatter: `{a}在 {b} 时间出现 {c} 次`
            },
            xAxis: {
                data: timeArr,
                type: 'category',
                boundaryGap: false,
            },
            yAxis: {},
            series: [
                {
                    name: `${errorType}`,
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    areaStyle: {
                        // normal: {},
                    },
                    stack: 'a',
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


/**
 * 各种数据的曲线趋势图
 */
export const DataSmoothLineChart = ({ xdata, ydata, typedata, height, title }) => {
    const isLoading = useFakerLoading(waitTime);
    return <Chart
        isLoading={isLoading}
        height={height}
        isDark={false}
        option={{
            title: {
                left: 'center',
                text: `${title} 数量时间图`
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                data: xdata,
                type: 'category',
                boundaryGap: false,
            },
            yAxis: {},
            series: ydata.map((value, index) => {
                return {
                    name: typedata[index],
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    data: value,
                    label: {
                        fontSize: 16,
                        fontWeight: 'bold'
                    }
                }
            }),

        }}

    />
}