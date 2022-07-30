import { Route, Routes, useNavigate } from "react-router-dom";
import Bar from "./Bar"

export default function Pv() {
    let navigate = useNavigate();
    return (
        <div className="info">
            <Routes>
                <Route path="/pv/bar" element={<Bar />}></Route>
            </Routes>
            <h1 className="info--h1">i am pv page</h1>
            <button onClick={() => navigate("/pv/bar")} className="info--button">to:bar</button>
        </div>
    )
}