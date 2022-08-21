import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Err from "./view/Error/Err"
import Event from "./view/Action/Action"
import Http from "./view/Http/Http";
import './App.css'
import { initMonitor } from 'jiqi-f-monitor'
initMonitor('http://1.15.77.73:8080/')
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/err" element={<Err />}></Route>
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