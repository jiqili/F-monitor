import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Err from "./Err/Err"
import Event from "./Event/Event"
import Http from "./Http/Http";
import Performance from "./Performance/Performance";
import Pv from "./Pv/Pv.js"
import Bar from "./Pv/Bar";

import React from "react";
import './style.css'

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
            <h1 className="info--h1">i am homepage</h1>
            <button onClick={() => navigate("/err")} className="info--button">test errDemo</button>
            <button onClick={() => navigate("/event")} className="info--button">test eventDemo</button>
            <button onClick={() => navigate("/http")} className="info--button">test httpDemo</button>
            <button onClick={() => navigate("/performance")} className="info--button">test performanceDemo</button>
            <button onClick={() => navigate("/pv")} className="info--button">test pvDemo</button>
        </div>
    )
}