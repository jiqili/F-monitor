import React from "react"

export default function Err() {

    function runJsError1() {
        console.log('here')
        let obj = {}
        obj.a.b = 1
    }
    function runJsError2() {
        let foo = 1
        foo()
    }
    function promiseError() {
        Promise.reject('Trigger Promise Error')
    }
    function consoleError() {
        console.error('Trigger Console Error!')
    }
    return (
        <div className="info">
            <h1 className="info--h1">I am error page</h1>
            <button
                onClick={() => runJsError1()}
                className="info--button"
            >run js error 1</button>
            <button
                onClick={() => runJsError2()}
                className="info--button"
            >run js error 2</button>
            <button
                onClick={() => promiseError()}
                className="info--button"
            >promise reject</button>
            <button
                onClick={() => consoleError()}
                className="info--button"
            >console.error</button>
        </div>
    )

}