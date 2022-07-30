import React from "react";
import { useNavigate } from "react-router-dom";
export default function Performance() {

    function addScript() {
        const script = document.createElement('script');
        script.type = "text/babel"
        script.src = './testScript.js';
        document.head.append(script);
    }

    function addLink() {
        const link = document.createElement('link')
        link.type = "text/css"
        link.href = "./testLink.css"
        link.rel = 'stylesheet';
        document.head.append(link)
    }
    // const [num,setNum] = React.useState();

    function addCSS() {
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = '/testLink.css';
        document.head.appendChild(link);
    }

    function addImg() {
        const img = document.createElement('img');
        const size = Math.ceil(Math.random() * 100);
        img.src = `https://p2.music.126.net/vB84V9nQ5PpwGt6oDuhxqg==/7984653441988970.jpg?param=${size}y${size}`;
        document.body.appendChild(img);
    }

    function addLocalImg() {
        const img = document.createElement('img');
        document.body.appendChild(img);
        img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAWCAMAAAD+dOxOAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACEFBMVEU3R09BSE3/aAD/VyIAAAA3R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R083R080R1A0R1A1R08yR1AwRlA1R081R1A1R081R081R080R1A2R082R08vRlH4ViT/Whr/Whn/Wxb/WB7/WB//VyL/Wxj/XRD/Xg//XBX/WRv/XRH/XBX/WB7/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/VyL/ViH/VR//VSD/ViD+az39pYn8qY79qI78qpD+h2H+glv71cr9mHj9lnb9l3f+fFP+dEn8w7H/WiX/Uhv/Uxz+aDj7zr/9imX+fVT+flX+cET/WCP/XCj9qI38vqr8u6f8u6b8x7f8x7b/XSr/WCT/WSX+f1f8wK3/Wib+flb+hV//VB78tqD/VB/9iWX8vqv/Ux39m3z8rJP8xbT9oIP9jWn7z8L9jmr/YzL+f1j9o4f9mHn+cUQAAABiXhJiAAAAcXRSTlMAAAAAAAoJDQgdJREGARBWhZNAlNBUd3NLmmxr0dU9Pq0L6N3DtwIvOEYaFUk+V1lMLYNbAwIJCgkLCwsJCAgJCggIAji7xcRD9C/nH9sTzAkDp5N9aFT8QfYw7iDi4wZbpdf+5a9eAhlFgNaqYycFG/l+tLAAAAABYktHRASPaNlRAAAACXBIWXMAAAB4AAAAeACd9VpgAAAAB3RJTUUH5QISCDAI1QMDnAAAAUpJREFUGNNjYGBlY+fg5OJm5+HlY2NnAAJ+AUEhYRFRMXEJSX4pkIC0jKycvIKioJKyirSqvBoDo7qGppa2DpOunr6BoZGxCYOpmbmFpZWFtY2tnb2Do5Mzg4urmzscuLm6MHh4FiIBTw8GL+/ComIoKCn09mLw8S0tK6+oBIGq6kJfHwY//+Ka2rp6EGhoLPT3YwhwLWlqbmkFgbaSQtcAhsCgovaOzq5uIOjpLQwKZGAOLuzrnzBx4sRJk6dMLQxmZmAOAdo2bfr06YUzZs4qDAEKhBaWzJ5TUlg4t3NeYWEoUCAsfP6ChX3FcxctXlIcHgYUiIgsal86c9nyJStWFkdGAAWiogsLV61eM2/tupbC6CigQExsIcjxhUCHF8bFAAXiExKTIkEeS05JTYsHCjAzp2dkZrlm5+Tm5QM5DCzMYGBdEA+mWQDainMpZaFBiAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wNy0xOVQwMzozOToxNSswMDowMFrQJhgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDEtMDhUMjA6MDc6NTUrMDA6MDAY1ESzAAAAIHRFWHRzb2Z0d2FyZQBodHRwczovL2ltYWdlbWFnaWNrLm9yZ7zPHZ0AAABjdEVYdHN2Zzpjb21tZW50ACBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIM5IkAsAAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADcwNHxxE5sAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANTAxnG5jJwAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNTQ2OTc4MDc1s6i/GQAAABJ0RVh0VGh1bWI6OlNpemUAMjkxNjhCM09TOQAAAFp0RVh0VGh1bWI6OlVSSQBmaWxlOi8vL2RhdGEvd3d3cm9vdC93d3cuZWFzeWljb24ubmV0L2Nkbi1pbWcuZWFzeWljb24uY24vZmlsZXMvMTIxLzEyMTAxOTAucG5no98usQAAAABJRU5ErkJggg==';
    }
    function addXHR() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', `/index.html?t=${Date.now()}`);
        xhr.send();
        console.log(xhr);
    }

    function addErrXHR() {
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/not-found');
        xhr.send(JSON.stringify({}));
    }
    let navigate = useNavigate()
    return (
        <div className="info">
            <h1 className="info--h1">i am performance page</h1>
            <button onClick={() => navigate("/pv")} className="info--button">测试PV</button>
            <button onClick={addScript} className="info--button">插入Script</button>
            <button onClick={addLink} className="info--button">插入Link</button>
            <button onClick={addCSS} className="info--button">插入引用其他资源的CSS文件</button>
            <button onClick={addImg} className="info--button">插入Img</button>
            <button onClick={addLocalImg} className="info--button">插入Base64图片</button>
            <button onClick={addXHR} className="info--button">发送XMLHTTPRequest</button>
            <button onClick={addErrXHR} className="info--button">发送异常的XMLHTTPRequest</button>
        </div>
    )
}