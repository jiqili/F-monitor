import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Err from "./view/Error/Err"
import Event from "./view/Action/Action"
import Http from "./view/Http/Http"
import './App.css'
import {ReactBoundary, SetOptions} from'./core/index' //如要使用react捕获，在需要捕获的组件用ReactBoundary包裹即可
// import './core/index'   不需要使用react捕获直接引入
import {BuggyCounter} from "./view/Error/ReactbugCounter"

SetOptions({//用户自定义请求池大小、发送间隔、请求过滤url
  setEmitLen:3,
  setEmitTime:3000,
  // setUrlIgnoreList:['apifox']
})

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/err" element={<ReactBoundary> <Err /> <BuggyCounter /> </ReactBoundary>}></Route>
        <Route path="/event" element={<Event />}></Route>
        <Route path="/http" element={<Http />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
const Home = () => {
  let navigate = useNavigate()
  return (
    <div className="info">
      <h1 className="info--h1">I am Homepage</h1>
      <button onClick={() => navigate("/event")} className="info--button">User Switch</button>
      <button onClick={() => navigate("/err")} className="info--button">Trigger Error</button>
      <button onClick={() => navigate("/http")} className="info--button">Emit Request</button>
    </div>
  )
}