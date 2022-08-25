import { useState, useEffect } from "react";
import { FetchAllErrors, FetchHTTPSuccessRate, FetchPerformanceData, FetchPopularBrowsers, FetchPV, FetchResourceErrors, FetchUV } from "../fetch";



//获取一次性的数据
export const useFetchOnceData = () => {
    const [data, setData] = useState({});
    const localID = `fetchOnce`
    useEffect(() => {
        const fn = async () => {
            const isFetched = localStorage.getItem(localID);
            if (!isFetched) {
                const httpSuccessRate = await FetchHTTPSuccessRate(),
                    pvNores = await FetchPV(), pv = pvNores.reduce((a, b) => { return { pv: a.pv + b.pv } }, { pv: 0 }).pv,
                    uvNores = await FetchUV(), uv = uvNores.reduce((a, b) => { return { visit: [...a.visit, b.visit] } }, { visit: [] }).visit.length,
                    browsers = await FetchPopularBrowsers(),
                    performances = await FetchPerformanceData(),
                    errorResourceNum = (await FetchResourceErrors()).length,
                    errorNum = (await FetchAllErrors()).length;
                const res = { httpSuccessRate, pv, uv, browsers, performances, errorResourceNum, errorNum };
                localStorage.setItem(localID, JSON.stringify(res));
            }
            setData(data => {
                const res = localStorage.getItem(localID);
                return {
                    ...data, ...JSON.parse(res)
                }
            })
        };
        fn();
    }, []);
    return data;
}

//获取数据
export const useFetchAnyWayData = (fetchFn, ...resProps) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fn = async () => {
            const res = await fetchFn(...resProps);
            setData(data => {
                return [...res];
            });
        };
        fn();
    }, []);
    return data;
}