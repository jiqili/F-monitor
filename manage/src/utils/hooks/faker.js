/**
 * 提供假数据
 */
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';



function _frontArr(arr) {
    if (!Array.isArray(arr)) {
        return arr;
    }
    for (let length = arr.length, i = 0; i < length; i++) {
        if (Array.isArray(arr[i])) {
            arr[i] = _frontArr(arr[i]);
        } else {
            arr[i] = ~~arr[i - 1] + faker.datatype.number({ min: 0, max: 100, precision: 5 });
        }
    }
    return arr;
}



/**
 * 返回数字数组
 * 指定初始长度，获取时间以及自定义多维数组
 */
export const useFakerNumArr = (initLength = 100, time = 1000, numArrs = 1) => {
    const is2DArray = numArrs > 1,
        initArray = Array.from({ length: is2DArray ? numArrs : initLength }, () => {
            if (is2DArray) {
                return Array.from({ length: initLength }, () => faker.datatype.number({ min: 0, max: 100, precision: 5 }));
            } else {
                return faker.datatype.number({ min: 0, max: 100, precision: 5 });
            }
        });

    const [data, setData] = useState(_frontArr(initArray));
    useEffect(() => {
        const timer = setInterval(() => {
            setData((data) => {
                if (is2DArray) {
                    return data.map(arr => [...arr, arr[arr.length - 1] + faker.datatype.number({ min: 0, max: 100, precision: 5 })]);
                } else {
                    return [...data, data[data.length - 1] + faker.datatype.number({ min: 0, max: 100, precision: 5 })];
                }
            });
        }, time);
        return () => clearInterval(timer);
    }, []);
    return data;
}


/**
 * 返回年代数组
 */
export const useFakerYearArr = (initLength = 100, time = 1000) => {
    let year = 1900;
    const [data, setData] = useState(Array.from({ length: initLength }, () => year++));
    useEffect(() => {
        const timer = setInterval(() => {
            setData((data) => [...data, year++]);
        }, time);
        return () => clearInterval(timer);
    }, []);
    return data;
}

/**
 * 返回伪加载
 */
export const useFakerLoading = (time = 1000) => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        let timer = setTimeout(() => {
            setLoading(false);
        }, time);
        return () => clearInterval(timer);
    }, []);
    return isLoading;
}


/**
 * 返回随机颜色队列
 */
export const useFakerColorArr = (length = 0) => {
    const [arr, setArr] = useState(Array.from({ length }, () => faker.color.rgb({ prefix: '#' })));
    return arr;
}

/**
 * 固定长度数组，逐渐增加值
 */
export const useFakerNumArrByOrderLen = (length = 0, time = 500) => {
    const [arr, setArr] = useState(Array.from({ length }, () => faker.datatype.number({ min: 0, max: 300, precision: 5 })));
    useEffect(() => {
        const timer = setInterval(() => {
            setArr(arr.map(value => value + faker.datatype.number({ min: 0, max: 300, precision: 5 })));
        }, time);
        return () => clearInterval(timer);
    }, []);
    return arr;
}

/**
 * 返回时段序列
 */
export const useFakerOclockTimeArr = (length = 0, time = 500) => {
    let startHour = 8, startMinute = 0;
    function execTime() {
        if (startMinute >= 50) {
            startMinute = 0;
            startHour++;
        } else {
            startMinute += 10;
        }
        if (startHour >= 23) {
            startHour = 0;
        }
        return `${startHour}:${startMinute}`;
    }
    const [arr, setArr] = useState(Array(length).fill(0).map(execTime));
    useEffect(() => {
        const timer = setInterval(() => {
            setArr((arr) => [...arr, execTime()]);
        }, time);
        return () => clearInterval(timer);
    }, []);
    return arr;
}

/**
 * 固定长度的时序数组
 */
export const useFakerOclockTimeArrByOrder = (length = 0, time = 500) => {
    let startHour = 8, startMinute = 0;
    function execTime() {
        if (startMinute >= 50) {
            startMinute = 0;
            startHour++;
        } else {
            startMinute += 10;
        }
        if (startHour >= 23) {
            startHour = 0;
        }
        return `${startHour}:${startMinute}`;
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
 * 纯随机数值数组
 */
export const useFakerRandomNumArr = (initLength = 100, time = 1000, numArrs = 1) => {
    const is2DArray = numArrs > 1,
        initArray = Array.from({ length: is2DArray ? numArrs : initLength }, () => {
            if (is2DArray) {
                return Array.from({ length: initLength }, () => faker.datatype.number({ min: 0, max: 100, precision: 5 }));
            } else {
                return faker.datatype.number({ min: 0, max: 100, precision: 5 });
            }
        });

    const [data, setData] = useState(initArray);
    useEffect(() => {
        const timer = setInterval(() => {
            setData((data) => {
                if (is2DArray) {
                    return data.map(arr => [...arr, faker.datatype.number({ min: 0, max: 100, precision: 5 })]);
                } else {
                    return [...data, faker.datatype.number({ min: 0, max: 100, precision: 5 })];
                }
            });
        }, time);
        return () => clearInterval(timer);
    }, []);
    return data;
}

/**
 * 固定长度随机数组数组
 */
export const useFakerRandomNumArrByOclock = (initLength = 100, time = 1000, numArrs = 1) => {
    const is2DArray = numArrs > 1,
        initArray = Array.from({ length: is2DArray ? numArrs : initLength }, () => {
            if (is2DArray) {
                return Array.from({ length: initLength }, () => faker.datatype.number({ min: 0, max: 100, precision: 5 }));
            } else {
                return faker.datatype.number({ min: 0, max: 100, precision: 5 });
            }
        });

    const [data, setData] = useState(initArray);
    useEffect(() => {
        const timer = setInterval(() => {
            setData((data) => {
                if (is2DArray) {
                    const arr = data.map(arr => [...arr, faker.datatype.number({ min: 0, max: 100, precision: 5 })]);

                    return arr.map(list => list.slice(1));
                } else {
                    const arr = [...data, faker.datatype.number({ min: 0, max: 100, precision: 5 })];
                    arr.unshift();
                    return arr.map(list => list.slice(1));
                }
            });
        }, time);
        return () => clearInterval(timer);
    }, []);
    return data;
}


/**
 * 随机错误列表
 */
export const useFakerErrorList = (num) => {
    const [data, setData] = useState(Array.from({ length: num }, () => {
        return {
            id: faker.database.column(),
            errorMsg: faker.lorem.lines()
        }
    }));
    return data;
}