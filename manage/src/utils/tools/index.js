//防抖函数
export function debounce(fn, delay) {
    // 维护一个 timer，用来记录当前执行函数状态
    let timer = null;
    return function () {
        // 清理掉正在执行的函数，并重新执行
        clearTimeout(timer);
        timer = setTimeout(() => { fn.apply(this, arguments) }, delay);
    }
}

//节流函数
export function thorttleFn(fn, absTime) {
    let time = 0;
    return function () {
        let curTime = new Date();
        // console.log({time,curTime})
        if (time === 0) {
            fn.apply(this, arguments);
            time = curTime;
        } else if (curTime - time >= absTime) {
            time = curTime;
            fn.apply(this, arguments);
        }
    }
}