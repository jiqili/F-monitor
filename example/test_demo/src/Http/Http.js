import axios from 'axios';
import React from 'react';

export default function Http() {
    const [get, setGet] = React.useState(null);
    const [fetchdata, setFetchdata] = React.useState(null);

    function handleXHR() {
        axios.get('http://127.0.0.1:4523/mock/671786/pet/1')
            .then(res => {
                setGet(res.data);
            })
    }
    function handleFetch() {
        async function fetchData() {
            const response = await fetch(`https://api.imgflip.com/get_memes`);
            const data = await response.json();
            setFetchdata(data.data.memes);
        }
        fetchData();
    }
    // console.log(fetchdata[0])
    return (
        <div className='info'>
            <h1 className='info--h1'>i am http page</h1>
            <button
                onClick={handleXHR}
                className="info--button"
            >
                发送XHR
            </button>
            <button
                onClick={handleFetch}
                className="info--button"
            >
                发送Fetch
            </button>
        </div>
    )
}
