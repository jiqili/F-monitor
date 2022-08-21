import React from "react"

export default function Err() {

    function runJsError1() {
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
    function loadScriptError() {
        const script = document.createElement('script');
        script.src = 'http://xxxxxxxx';
        document.body.appendChild(script);
    }
    function loadImgError() {
        const img = document.createElement('img');
        img.src = 'https://xxxxxxxx';
        document.body.appendChild(img);
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
            <button
                onClick={() => loadScriptError()}
                className="info--button"
            >load script error</button>
            <button
                onClick={() => loadImgError()}
                className="info--button"
            >load img error</button>
        </div>
    )

}