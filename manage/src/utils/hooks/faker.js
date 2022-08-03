/**
 * 提供假数据
 */
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';


/**
 * 返回数字数组
 * 指定初始长度，获取时间以及自定义多维数组
 */
export const useFakerNumArr = (initLength = 100,time=1000,numArrs=1) => {
    const is2DArray=numArrs>1,
    initArray=Array.from({length:is2DArray?numArrs:initLength},()=>{
        if(is2DArray){
            return Array.from({length:initLength},()=>faker.datatype.number({min:10,max:300,precision:1}));
        }else{
            return faker.datatype.number({min:10,max:300,precision:1})
        }
    });

    const [data,setData]=useState(initArray);
    useEffect(()=>{
        const timer=setInterval(()=>{
            setData((data)=>{
                if(is2DArray){
                    return data.map(arr=>[...arr,faker.datatype.number({min:10,max:300,precision:1})]);
                }else{
                    return [...data,faker.datatype.number({min:10,max:300,precision:1})];
                }
            });
        },time);
        return ()=>clearInterval(timer);
    },[]);
    return data;
}


/**
 * 返回年代数组
 */
export const useFakerYearArr=(initLength=100,time=1000)=>{
    let year=1900;
    const [data,setData]=useState(Array.from({length:initLength},()=>year++));
    useEffect(()=>{
        const timer=setInterval(()=>{
            setData((data)=>[...data,year++]);
        },time);
        return ()=>clearInterval(timer);
    },[]);
    return data;
}

/**
 * 返回伪加载
 */
export const useFakerLoading=(time=1000)=>{
    const [isLoading,setLoading]=useState(true);
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(!isLoading);
        },time);
    },[]);
    return isLoading;
}


/**
 * 返回随机颜色队列
 */
export const useFakerColorArr=(length=0)=>{
    const [arr,setArr]=useState(Array.from({length},()=>faker.color.rgb({prefix:'#'})));
    return arr;
}