import { useState, useEffect } from "react";

export const useMenuActiveIndex = () => {
    const [activeIndex, setActiveIndex] = useState('0');
    useEffect(() => {
        const index = sessionStorage.getItem('activeIndex');
        if (index) {
            setActiveIndex(index);
        }
        return () => sessionStorage.setItem('activeIndex', activeIndex);
    }, []);
    const handerSetIndex = (index) => {
        sessionStorage.setItem('activeIndex', index);
        setActiveIndex(index);
    }
    return { activeIndex, setActiveIndex: handerSetIndex }
}