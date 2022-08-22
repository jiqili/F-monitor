import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';

/**
 * 固定长度的数组，按照时间数值增加
 */
export const useFakerNumArrByOrderLen = (length = 0, time = 500) => {
    const [arr, setArr] = useState(Array.from({ length }, () => faker.datatype.number({ min: 3, max: 13, precision: 1 })));
    useEffect(() => {
        const timer = setInterval(() => {
            setArr(arr => arr.map(value => value + faker.datatype.number({ min: 1, max: 13, precision: 1 })));
        }, time);
        return () => clearInterval(timer);
    }, []);

    return arr;
}

/**
 * 固定长度的数组，返回url路径数组
 */
export const UseFakerUrlsArrByOrderLen = (length = 0,host='http://1.15.77.73') => {
    return Array.from({ length }, () => `${host}${faker.system.directoryPath()}`)
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
 * 固定长度的数组，给定map返回随机原因
 */
export const UseFakerRandomReason = (arr = [], map = new Map()) => {
    if (!arr.length) {
        return [];
    }
    return Array.from({ length: arr.length }, (_, index) => {
        const reasons = map.get(arr[index]);
        if (!reasons) {
            return `not found`;
        }
        const len = reasons.length;
        if (len < 2) {
            return reasons[0];
        }
        const _index = Math.floor(Math.random() * len);
        return reasons[_index] || reasons[0];
    })
}

/**
 * 固定长度的时序数组
 */
export const useFakerOclockTimeArrByOrder = (length = 0) => {
    const date = new Date();
    let startHour = date.getHours(), startMinute = (date.getMinutes() / 15 >> 0) * 15;
    function execTime() {
        if (startMinute <= 0) {
            startMinute = 45;
            startHour--;
        } else {
            startMinute -= 15;
        }
        if (startHour <= 0) {
            startHour = 23;
        }
        return `${startHour}:${startMinute < 10 ? '0' + startMinute : startMinute}`;
    }
    const [arr, _] = useState(Array(length).fill(0).map(execTime));
    return arr.reverse();
}


/**
 * 固定长度，随时间走的数组
 */
export const useFakerTimePassingArr = (length = 0, time, { min = 0, max = 10, precision = 1 }) => {
    const [arr, setArr] = useState(Array.from({ length }, () => faker.datatype.number({ min, max, precision })));
    useEffect(() => {
        const timer = setInterval(() => {
            setArr(arr => {
                let ans = arr.slice(1);
                ans.push(faker.datatype.number({ min, max, precision }));
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
export const UseFakerDateTimeArray = (length = 1) => {
    //2022-8-21重构，需要对时间默认倒排序
    const date = new Date();
    let startDay = date.getDate(), startHour = date.getHours(), startMinute = date.getMinutes();
    function execTime() {
        if (startMinute <= 5) {
            startMinute = 59 - Math.floor(Math.random() * 5);
            startHour--;
        } else {
            startMinute -= Math.floor(Math.random() * startMinute);
        }
        if (startHour <= 0) {
            startHour = 23;
            startDay--;
        }
        return `2022-8-${startDay} ${startHour}:${startMinute < 10 ? '0' + startMinute : startMinute}`;
    }
    return Array.from({ length }, execTime);
}
/**
 * 获得给定长度的数值数组
 */
export const UseFakerNumArray = (length = 1) => {
    return Array.from({ length }, () => faker.datatype.number({ min: 70, max: 300, precision: 1 }))
}