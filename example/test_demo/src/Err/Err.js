import React from "react"

export default function Err() {
    //模拟白屏3s后加载页面
    const [flag, setFlag] = React.useState(false);
    React.useEffect(() => {
        async function blankscreen() {
            await new Promise(resolve => {
                setTimeout(() => {
                    setFlag(true);
                    resolve("hello world")
                }, 3000);
            }).then((res) => {
                // console.log(res);
            })

        }
        blankscreen();
    }, []);
    //上报自定义错误
    function handleClick() {
        // trace.traceError('自定义错误ID', '自定义错误message', {
        //     src: '/interface/order',
        //     params: {
        //         id: '12121',
        //     },
        // });
    }
    if (flag) {
        return (
            <div className="info">
                <h1 className="info--h1">i am err page</h1>
                <button
                    onClick={handleClick}
                    className="info--button"
                >上报自定义错误</button>
            </div>

        )
    }

}