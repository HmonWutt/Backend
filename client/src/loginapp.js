import React, { useState, useEffect} from "react";
import { useNavigate,useOutletContext,Outlet}  from "react-router-dom";
import Postrequest from "./postrequest";
import url from "./url";

function Loginapp() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [iserror, setIserror] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [isLoggedIn, setIsloggedIn] = useState(false)
  const nav = useNavigate();
  const [isAuth, setIsAuth] = useOutletContext()


  async function verifyuser(username, password) {
    console.log("saveuser request sent");

    const newurl = `${url}/users/login`;
    const body = { username, password };

    Postrequest(newurl, body).then((data) => {
      if (data.message === "success") {
        console.log("Login success! Redirecting...");
        console.log("username", username);
        console.log("message", data.message);
        console.log("identifier", data.identifier);
        setIserror("success");
        setUsername(username)
        setIsloggedIn(true)
        setIdentifier(data.identifier)
        setIsloggedIn(true)
       setIsAuth(true)
       // nav("/component")
      } else {
        setIsloggedIn(false)
        setIserror("error");
      }
    });
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    verifyuser(username, password);
  };

  return (
    <>
      <div className="App">
        <form id="loginform" onSubmit={loginSubmit}>
          <div
            style={{
              color: "yellow",
              fontSize: "1.5em",
              /* */
            }}
          ></div>

          {iserror === "error" && (
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding: "1rem",
                borderRadius: "0.5rem",
                backgroundColor: "rgb(254, 98, 98)",
                margin: "0.5rem",
              }}
              id="login-status"
            >
              Username or password is incorrect. Retry or create a new account.
            </div>
          )}
          {iserror === "success" && (
            <div
              style={{
                backgroundColor: "rgb(254, 98, 98)",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                padding: "1rem",
                borderRadius: "0.5rem",
                margin: "0.5rem",
              }}
              id="status"
            >
              Login success!
            </div>
          )}
          <div className="form-group">
            <label
              style={{
                color: "black",
                textShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              }}
            >
              Username
            </label>
            <input
              type="text"
              className="form-control m-2"
              id="Username"
              name="Username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <small id="usernameerror" className="text-danger form-text"></small>
          </div>
          <div id="passworderror" className="form-group">
            <label
              style={{
                color: "black",
                textShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              }}
            >
              Password
            </label>

            <input
              type="password"
              className="form-control m-2"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <small id="passworderror" className="text-danger form-text"></small>
          </div>
          <button type="submit" className="btn btn-primary">
            Log in
          </button>
        </form>
        <div>Default username: default</div>
        <div>Default password: defaultpassword</div>
        <Outlet context={[isAuth, setIsAuth]} />
      </div>
    </>
  );
}
export default Loginapp;
