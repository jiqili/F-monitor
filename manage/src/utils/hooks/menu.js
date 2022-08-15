import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { __routerArray } from "@components/menu";
export const useMenuActiveIndex = () => {
    const [activeIndex, setActiveIndex] = useState('0');
    const router = useRouter(),
        catchIndex = findRouterIndex(__routerArray);
    useEffect(() => {
        const index = sessionStorage.getItem('activeIndex');
        //先对存储的进行判断
        if (index) {
            setActiveIndex(index);
        }
        //然后再对页面url进行判断
        if (catchIndex(router.pathname) !== index) {
            setActiveIndex(catchIndex(router.pathname));
        }
        return () => sessionStorage.setItem('activeIndex', activeIndex);
    }, []);
    const handerSetIndex = (index) => {
        sessionStorage.setItem('activeIndex', index);
        setActiveIndex(index);
    }
    return { activeIndex, setActiveIndex: handerSetIndex }
}


const findRouterIndex = (arr) => {
    const map = new Map(flatArray(arr));
    return (pathname) => {
        return map.get(pathname);
    }

}

const flatArray = (arr, indexStr = '0') => {
    if (!Array.isArray(arr)) {
        return [[arr, indexStr]];
    }
    const ans = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        if (Array.isArray(arr[i])) {
            ans.push(...flatArray(arr[i], `${i}`));
        } else if (indexStr !== '0') {
            ans.push([arr[i], `${indexStr}.${i}`]);
        } else {
            ans.push([arr[i], `${i}`]);
        }
    }
    return ans;
}