/**
 * 该文件设置图标常用到的hooks，
 * 构造微粒度hooks，在不同组件中
 * 进行组合。
 */
import * as echarts from "echarts";
import { useEffect, useRef } from 'react';
import { debounce } from "@utils/tools";
/**
 * 初始化图表，组件销毁时附带销毁图表，返回需要需要挂载的ref
 */
export const useInitCharts = ({ height = 400, width = 400, autoResize = false, ...resProps }) => {
    const chartRef = useRef(null);
    useEffect(() => {
        let chart = echarts.getInstanceByDom(chartRef.current);
        if (!chart) {
            //echart初始化容器
            if (autoResize) {
                chart = echarts.init(chartRef.current, 'dark');
            } else {
                chart = echarts.init(chartRef.current, 'dark', {
                    height, width, ...resProps
                });
            }
        };
        return () => chart.dispose();
    }, []);
    return chartRef;
}


/**
 * 加载动画
 */
export const useLoadingAnamationCharts = (chartRef, isLoading = true) => {
    useEffect(() => {
        let chart = echarts.getInstanceByDom(chartRef.current);
        if (isLoading) {
            chart.showLoading('default'
                , {
                    text: 'loading',
                    maskColor: 'rgb(16,12,42)',
                    textColor: 'white',
                    fontSize:20,
                });
        }
        else chart.hideLoading();
    }, [isLoading]);
}
/**
 * 监听resize
 */
export const useResizeCarts = (chartRef) => {
    useEffect(() => {
        let chart = echarts.getInstanceByDom(chartRef.current);
        const fn = debounce(chart.resize, 50);
        window.addEventListener("resize", fn);
        return () => window.removeEventListener("resize", fn);
    }, []);
}

/**
 * 给图表加载数据,需要对数据进行封装，详见@utils/tools/datastructure
 */
export const useOptionsCharts = (chartRef, option, isLoading = true) => {
    useLoadingAnamationCharts(chartRef, isLoading);
    useResizeCarts(chartRef);
    useEffect(() => {
        let chart = echarts.getInstanceByDom(chartRef.current);
        !isLoading && chart.setOption(option);
    }, [option, isLoading]);
}