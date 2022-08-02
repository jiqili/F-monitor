/**
 * 这个文件下保存生产menu项的函数
 */

/**
 * menu下有多个菜单项和子菜单项，定义其中菜单项只做包含子菜单项用；只有子菜单项可以跳转路由
 * antd version > 4.20时只需要传入数组对象 
 */

/**
 * 菜单项，自身点击不跳转，含有子菜单项。
 */
function __subItem(label, key, icon, children) {
    return {
        label,
        key,
        icon,
        children
    }
}
/**
 * 子菜单项，点击跳转路由
 */
function __getItem(label, key, onClick) {
    return {
        key,
        label,
        onClick
    };
}

// export default
 function MenuItem({ label, key, icon, children, href = '' }, router) {
    const Item = __subItem({ label, key, icon, children });
    function handleClick(href) {
        router.push(`/${href}`);
    }
    if (!Item.children) {
        Item.onClick = handleClick.bind(null, Item.href);
    } else {
        Item.children.map(obj => {
            return __getItem({
                ...obj, onClick: handleClick.bind(null, obj.href),
            })
        })
    }
    return Item;
}

/**
 * 我发现根本就不用这些
 */
