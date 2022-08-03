import { useContext, useEffect, useState, createContext, useLayoutEffect } from "react";
/**
 * 当主动刷新页面时menu active会错开，需要使用context固定
 */
const menuContext = createContext({
    activeIndex: null,
    setActiveIndex: null,
});
const MenuProview = ({ children }) => {
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
    return (
        <menuContext.Provider value={{ activeIndex, setActiveIndex: handerSetIndex }}>
            {children}
        </menuContext.Provider>
    )
}
export default MenuProview;
export const useMenuActiveIndex = () => {
    return useContext(menuContext);
}