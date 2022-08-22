/**
 * 该文件设置图标常用到的hooks，
 * 构造微粒度hooks，在不同组件中
 * 进行组合。
 */
import * as echarts from "echarts";
import { useEffect, useRef } from 'react';
/**
 * 初始化图表，组件销毁时附带销毁图表，返回需要需要挂载的ref
 */
export const useInitCharts = (option, isDark = true) => {
    const chartRef = useRef(null);
    useEffect(() => {
        let chart = echarts.getInstanceByDom(chartRef.current);
        if (!chart) {
            //echart初始化容器
            if (isDark) chart = echarts.init(chartRef.current, 'dark', option);
            else chart = echarts.init(chartRef.current, 'light', option);
        };
        return () => chart.dispose();
    }, []);
    return chartRef;
}


/**
 * 加载动画
 */
export const useLoadingAnamationCharts = (chartRef, isLoading = true, isDark = true) => {
    useEffect(() => {
        let chart = echarts.getInstanceByDom(chartRef.current);
        if (isLoading) {
            if (isDark) chart.showLoading('default'
                , {
                    text: 'loading',
                    maskColor: 'rgb(16,12,42)',
                    textColor: 'white',
                    fontSize: 20,
                });
            else chart.showLoading();
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
        // const fn = debounce(chart.resize, 50);
        window.addEventListener("resize", chart.resize);
        return () => window.removeEventListener("resize", chart.resize);
    }, []);
}

/**
 * 给图表加载数据,需要对数据进行封装，详见@utils/tools/datastructure
 */
export const useOptionsCharts = (chartRef, option, isLoading = true,isDark=true) => {
    useLoadingAnamationCharts(chartRef, isLoading,isDark);
    useResizeCarts(chartRef);
    useEffect(() => {
        let chart = echarts.getInstanceByDom(chartRef.current);
        !isLoading && chart.setOption(option);
    }, [option, isLoading]);
}