import React from 'react';

export default function Http() {
    const [xhrData, setXhrData] = React.useState(null);
    const [fetchData, setFetchData] = React.useState(null);

    function handleXHR() {
      let xhr = new XMLHttpRequest()
      xhr.open('GET', 'http://localhost:8080/xhr')
      xhr.send()
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
          setXhrData(xhr.response)
        }
      }
    }
    async function handleFetch() {
      const response = await fetch('http://localhost:8080/fetch');
      const data = await response.json();
      setFetchData(data.data);
    }
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
            <div>xhrData: {xhrData}</div>
            <div>fetchData: {fetchData}</div>
        </div>
    )
}
