import { LineChart } from "@components/charts/lines";
import { useFakerYearArr,useFakerNumArr, useFakerLoading } from "@utils/hooks/faker";


const App = () => {
    const time=500,initLength=1000;
    const years=useFakerYearArr(initLength,time),
    nums=useFakerNumArr(initLength,time),
    isLoading=useFakerLoading(time);
    return <LineChart
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
                data: years,
            },
            yAxis: {},

            series: {
                type: 'line',
                //是否显示具体数据点
                showSymbol: false,
                data: nums,
            }
        }}
    />
}

export default App;