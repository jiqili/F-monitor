import React from 'react';

export default function Http() {

  // origin sync req success
  const [syncSuccess, setSyncSuccess] = React.useState(null);
  // origin async req success
  const [asyncSuccess, setAsyncSuccess] = React.useState(null);
  // req 404
  const [notFoundData, setNotFoundData] = React.useState(null);
  // req 505
  const [internalServerError, setInternalServerError] = React.useState(null);
  // req timeout
  const [timeoutError, setTimeoutError] = React.useState(null);
  //fetch success
  const [fetchData, setFetchData] = React.useState(null);
  //fetch 404
  const [fetchNotFound, setFetchNotFound] = React.useState(null);
  //fetch 500
  const [fetchInterError, setFetchInterError] = React.useState(null);

  // origin sync req success
  function handleSyncSuccess() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://mock.apifox.cn/m1/671786-0-default/pet/1', false);
    request.send(null);
    if (request.status === 200) {
      const res = JSON.parse(request.response);
      setSyncSuccess(res.data.name)
    }
  }

  // origin async req success
  function handleAsyncSuccess() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://mock.apifox.cn/m1/671786-0-default/pet/1');
    request.send();
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        const res = JSON.parse(request.response);
        setAsyncSuccess(res.data.name)
      }
    }
  }

  // req 404
  function handleNotFound() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://mock.apifox.cn/m1/671786-0-default/pet/3", true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
        } else {
          setNotFoundData(xhr.statusText)
        }
      }
    };
    xhr.send(null);
  }

  // req 500
  function handleInterServer() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://mock.apifox.cn/m1/671786-0-default/pet/500", true);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
        } else {
          setInternalServerError(xhr.statusText)
        }
      }
    };
    xhr.send(null);
  }
  //timeout
  function handleTimeOut() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:4523/m1/671786-0-default/pet/1', true);
    xhr.timeout = 10;
    xhr.onload = function () {
      // console.log(xhr.responseText);
    }
    xhr.ontimeout = function (e) {
      setTimeoutError("The request for timed out.");
    }
    xhr.send(null);
  }
  //fetch success
  async function handleFetch() {
    const response = await fetch('http://localhost:8080/fetch');
    const data = await response.json();
    setFetchData(data.data);
  }
  //fetch 404
  async function handleFetch404() {
    const response = await fetch('https://mock.apifox.cn/m1/671786-0-default/pet/3');
    const data = await response.json();
    setFetchNotFound(data.message);
  }
  //fetch 500
  async function handleFetch500() {
    const response = await fetch('https://mock.apifox.cn/m1/671786-0-default/pet/500');
    // const data = await response.json();
    setFetchInterError(response.statusText);
  }
  return (
    <div className='info'>
      <h1 className='info--h1'>i am http page</h1>
      <button
        onClick={handleSyncSuccess}
        className="info--button"
      >
        origin sync req success
      </button>
      <button
        onClick={handleAsyncSuccess}
        className="info--button"
      >
        origin async req success
      </button>
      <button
        onClick={handleNotFound}
        className="info--button"
      >
        req 404
      </button>
      <button
        onClick={handleInterServer}
        className="info--button"
      >
        req 500
      </button>
      <button
        onClick={handleTimeOut}
        className="info--button"
      >
        req timeout
      </button>
      <button
        onClick={handleFetch}
        className="info--button"
      >
        handle Fetch
      </button>
      <button
        onClick={handleFetch404}
        className="info--button"
      >
        Fetch 404
      </button>
      <button
        onClick={handleFetch500}
        className="info--button"
      >
        Fetch 500
      </button>

      <h3>AJAX</h3>
      <p>syncSuccessData : {syncSuccess}</p>
      <p>asyncSuccessData : {asyncSuccess}</p>
      <p>req404 : {notFoundData}</p>
      <p>req500 : {internalServerError}</p>
      <p>timeout : {timeoutError}</p>
      <h3>Fetch</h3>
      <p>fetchData : {fetchData}</p>
      <p>fetch404:{fetchNotFound}</p>
      <p>fetch500:{fetchInterError}</p>
    </div>
  )
}