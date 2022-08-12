import { useState } from "react"

export default function Event() {
    let [name, setName] = useState(document.cookie.split(';')[0])
    function switchUser(name) {
        setName(name)
        document.cookie = `name=${name};url=localhost:3000;max-age=36000000`
    }
    let userList = []
    let USERNUMBER = 10
    for(let i=0;i<USERNUMBER;i++) userList.push(`user${i+1}`)
    return (
        <div className="info">
            <h1 className="info--h1">I am user action page</h1>
            <h2 className="info--h1">Current User: {name}</h2>
            <br />
            <fieldset>
                <legend>Switch User</legend>
                {userList.map(user => {
                    return <button onClick={() => switchUser(user)}>switch to {user}</button>
                })}              
            </fieldset>
        </div>
    )
}