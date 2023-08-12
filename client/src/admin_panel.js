//name the personalised tracker
//add task/edit tasks
import { useState, useEffect } from "react";

import Postrequest from "./postrequest";
import Getrequest from "./getrequest";

const AdminPanel = () => {
const username = "default"
    const[data,setData] = useState("")
    const [identifier,setIdentifier] = useState("")

async function getall(){
  Getrequest("http://192.168.0.6:3000/todos")
}
const url = `http://192.168.0.6:3000/addidentifier/${username}`
console.log(url)

async function addidentifier (identifier){
const body = {identifier: `'${identifier}'`}
    Postrequest (url, body).then(data=> console.log(data.message))}

const loginSubmit = (e) => {
    e.preventDefault();
    addidentifier(identifier);
  };


return (
  <>
     <form id="loginform" onSubmit={loginSubmit}>
      <div className="form-group">
        <label
          style={{
            color: "black",
            textShadow:
              "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          }}
        >
          Tracker nickname
        </label>
        <input
          type="text"
          className="form-control m-2"
          id="Username"
          name="Username"
          placeholder="Enter username"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value);
          }}
        />
        <small id="usernameerror" className="text-danger form-text"></small>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  </>
);

}

export default AdminPanel;