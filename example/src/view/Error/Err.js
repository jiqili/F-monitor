import React from 'react'

export default function Err() {
    //模拟白屏3s后加载页面
    const [flag, setFlag] = React.useState(true)
    React.useEffect(() => {
        async function blankScreen() {
            await new Promise((resolve) => {
                setTimeout(() => {
                    setFlag(true)
                    resolve('hello world')
                }, 3000)
            }).then((res) => {
                // console.log(res);
            })
        }
        blankScreen()
    }, [])
    //上报自定义错误
    function handleClick() {
        // trace.traceError('自定义错误ID', '自定义错误message', {
        //     src: '/interface/order',
        //     params: {
        //         id: '12121',
        //     },
        // });
    }
    function onLoadImageError() {
        const image = document.createElement('img')
        image.setAttribute('src', '/img/undefined.png')
        document.body.appendChild(image)
    }

    if (flag) {
        return (
            <div className="info">
                <h1 className="info--h1">I am error page</h1>
                <button onClick={handleClick} className="info--button">
                    上报自定义错误
                </button>
                {/* <button onClick={onLoadJsError}>load js error</button>
                <button onClick={onLoadCssError}>load css error</button> */}
                <button onClick={onLoadImageError}>load image error</button>
            </div>
        )
    } else {
        return <div>flag is {flag.toString()}</div>
    }
}
