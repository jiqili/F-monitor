import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Err from "./view/Error/Err"
import Event from "./view/Action/Action"
import Http from "./view/Http/Http";
import Performance from "./view/Performance/Performance";
import Pv from "./view/Pv/Pv.js"
import Bar from "./view/Pv/Bar";
import './App.css'
import './core/index'
export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/err" element={<Err />}></Route>
          <Route path="/event" element={<Event />}></Route>
          <Route path="/http" element={<Http />}></Route>
          <Route path="/performance" element={<Performance />}></Route>
          <Route path="/pv/*" element={<Pv />}></Route>
          <Route path="/pv/bar" element={<Bar />}></Route>
        </Routes>
      </BrowserRouter>
    )
}
const Home = () => {
  let navigate = useNavigate()
  return (
    <div className="info">
        {/*<iframe src={"http://www.baidu.com"}></iframe>*/}
        {/*<iframe src={"http://www.baidu.com"}></iframe>*/}
        {/*<iframe src={"http://www.baidu.com"}></iframe>*/}
      <h1 className="info--h1">I am Homepage</h1>
      <button onClick={() => navigate("/event")} className="info--button">Action</button>
      <button onClick={() => navigate("/err")} className="info--button">Error</button>
      <button onClick={() => navigate("/performance")} className="info--button">Performance</button>
      <button onClick={() => navigate("/http")} className="info--button">Http</button>
    </div>
  )
}