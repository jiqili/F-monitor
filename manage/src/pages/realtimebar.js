import { BarChart } from "@components/charts/bars";
import { useFakerColorArr, useFakerLoading, useFakerNumArrByOrderLen } from "@utils/hooks/faker";

const App = () => {
    const time = 500, arrLen = 5;
    const colors = useFakerColorArr(arrLen),
        nums = useFakerNumArrByOrderLen(arrLen, time),
        isLoading = useFakerLoading(time);
    return <BarChart
        isLoading={isLoading}
        width={1000}
        height={500}
        option={
            {
                title: {
                    text: "测试",
                    left: 'center',
                },
                xAxis: {},
                yAxis: {
                    type: 'category',
                    data: colors,
                    inverse: true,
                    animationDuration: 300,
                    animationDurationUpdate: 300,
                },
                series: [
                    {
                        realtimeSort: true,
                        type: 'bar',
                        data: nums.map((item,index)=>{return{
                            value:item,
                            itemStyle:{
                                color:colors[index]
                            }
                        }}),
                        label: {
                            show: true,
                            valueAnimation: true
                        }
                    }
                ],
                animationDuration: 1000,
                animationDurationUpdate: 1000,
                animationEasing: 'linear',
                animationEasingUpdate: 'linear'
            }
        }
    />
}

export default App;