//name the personalised tracker
//add task/edit tasks
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import Postrequest from "./postrequest";
import Getrequest from "./getrequest";

const AdminPanel = () => {
const username = "default"
    const[data,setData] = useState("")
    const [identifier,setIdentifier] = useState("")

async function checkidentifier(){
  if (!identifier){
    
  }
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
let x;
useEffect(()=>{
   // Getrequest(`http://192.168.0.6:3000/todo/${identifier}`).then(data =>  {console.log(typeof(data));console.log(data.values)})//data.map((x)=>{ console.log(x.description); console.log(x.hmon_count)}))
;

},[])


return (
  <>
    {!identifier && (
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
        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </form>
    )}
    <div className="form-group">
      <label
        style={{
          color: "black",
          textShadow:
            "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        }}
      >
        New chore name
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
    <Button type="submit" className="btn btn-primary">
      Add new chore
    </Button>
    <Button
      onClick={()=>{Getrequest(`http://192.168.0.6:3000/todo/${identifier}`).then(
        (data) => {
          console.log(typeof data);
          console.log(data[0]);
        }
      )}}
      className="btn btn-primary"
    >
      Summary
    </Button>
  </>
);

}

export default AdminPanel;