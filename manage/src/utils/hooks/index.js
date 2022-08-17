import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';

/**
 * 固定长度的数组，按照时间数值增加
 */
export const useFakerNumArrByOrderLen = (length = 0, time = 500) => {
    const [arr, setArr] = useState(Array.from({ length }, () => faker.datatype.number({ min: 1, max: 5, precision: 1 })));
    useEffect(() => {
        const timer = setInterval(() => {
            setArr(arr => arr.map(value => value + faker.datatype.number({ min: 1, max: 5, precision: 1 })));
        }, time);
        return () => clearInterval(timer);
    }, []);

    return arr;
}

/**
 * 固定长度的数组，返回url路径数组
 */
export const UseFakerUrlsArrByOrderLen = (length = 0) => {
    return Array.from({ length }, () => faker.system.directoryPath())
}
/**
 * 固定长度的数组，返回随机选择值的数组
 */
export const UseFakerRandomIndexArr = (length, arr = []) => {
    const len = arr.length;
    if (len < 2) {
        return Array.from({ length }, () => arr[0]);
    }
    return Array.from({ length }, () => {
        const index = Math.floor(Math.random() * len);
        return arr[index] || arr[0];
    })
}

/**
 * 固定长度的时序数组
 */
export const useFakerOclockTimeArrByOrder = (length = 0, time = 500) => {
    let startHour = 8, startMinute = 0;
    function execTime() {
        if (startMinute >= 59) {
            startMinute = 0;
            startHour++;
        } else {
            startMinute += 1;
        }
        if (startHour >= 23) {
            startHour = 0;
        }
        return `${startHour}:${startMinute < 10 ? '0' + startMinute : startMinute}`;
    }
    const [arr, setArr] = useState(Array(length).fill(0).map(execTime));
    useEffect(() => {
        const timer = setInterval(() => {
            setArr((arr) => {
                arr.shift();
                arr.push(execTime());
                return arr;
            });
        }, time);
        return () => clearInterval(timer);
    }, []);
    return arr;
}


/**
 * 固定长度，随时间走的数组
 */
export const useFakerTimePassingArr = (length = 0, time) => {
    const [arr, setArr] = useState(Array.from({ length }, () => faker.datatype.number({ min: 0, max: length * 10, precision: 1 })));
    useEffect(() => {
        const timer = setInterval(() => {
            setArr(arr => {
                let ans = arr.slice(1);
                ans.push(faker.datatype.number({ min: 0, max: length * 10, precision: 1 }));
                return ans;
            });
        }, time);
        return () => clearInterval(timer);
    }, []);

    return arr;
}


/**
 * 获得给定长度的uuid数组
 */
export const UseFakerUUIDArray = (length = 1) => {
    return Array.from({ length }, () => faker.datatype.uuid());
}
/**
 * 获得给定长度的时间数组
 */
export const UseFakerDateTimeArray=(length=1)=>{
    return Array.from({length},()=>faker.date.between('2022-08-01T00:00:00.000Z', '2022-08-16T00:00:00.000Z'))
}
/**
 * 获得给定长度的数值数组
 */
 export const UseFakerNumArray=(length=1)=>{
    return Array.from({length},()=>faker.datatype.number({ min: 70, max: 300, precision: 1 }))
}