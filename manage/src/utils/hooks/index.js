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