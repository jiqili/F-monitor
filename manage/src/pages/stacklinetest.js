import { LineChart } from "@components/charts/lines";
import { useFakerColorArr, useFakerLoading, useFakerNumArr, useFakerYearArr } from "@utils/hooks/faker";

const App = () => {
    const time = 500, initLength = 50,arrLen=5;
    const years = useFakerYearArr(initLength, time),
        nums = useFakerNumArr(initLength, time, arrLen),
        isLoading = useFakerLoading(time),
        colors = useFakerColorArr(arrLen);

    return <LineChart
        isLoading={isLoading}
        width={1000}
        height={500}
        option={{
            title: {
                left: 'center',
                text: 'stack test'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: years,
            },
            yAxis: {},
            series: nums.map((arr, index) => {
                return {
                    type: 'line',
                    //是否显示具体数据点
                    showSymbol: false,
                    data: arr,
                    stack: 'x',
                    //线条颜色
                    color: colors[index],
                    //tooltip显示名称
                    name:`${index}`,
                    emphasis: {
                        //高亮指定线
                        focus: 'series'
                      },
                }
            })
        }}
    />
}

export default App;