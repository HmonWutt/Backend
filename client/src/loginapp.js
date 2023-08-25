import React, { useState, useEffect, useRef, createContext } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  Outlet,
  Navigate,
  Link,
} from "react-router-dom";
import Postrequest from "./postrequest";
import url from "./url";
import useRefreshToken from "./useRefreshToken";

function Loginapp() {
  const [password, setPassword] = useState("");
  //const [username, setUsername] = useState("");
  const [iserror, setIserror] = useState("");

  const [isLoggedIn, setIsloggedIn] = useState(false);
  const nav = useNavigate();
  const useAuthContext = createContext();

  const [
    username,
    setUsername,
    isAuth,
    setIsAuth,
    identifier,
    setIdentifier,
    token,
    setToken,
    name1,
    setName1,
    name2,
    setName2,
  ] = useOutletContext();
  const location = useLocation();
  const previousToken = useRef("");

  async function verifyuser(username, password) {
    console.log("saveuser request sent");

    const newurl = `${url}/users/login`;
    const body = { username, password };

    Postrequest(newurl, body)
      .then((data) => {
        if (data.message === "success") {
          setIserror("success");
          setUsername(username);
          setIsloggedIn(true);
          setIdentifier(data.identifier);
          setIsloggedIn(true);
          setIsAuth(true);
          setToken(data.token);

          setName1(data.name1);
          setName2(data.name2);

          if (location.state?.from) {
            const to = location.state.from.pathname || "/component";
            console.log("to", to);
            nav(`${to}`);
          }
        } else {
          setIsloggedIn(false);
          setIserror("error");
        }
      })
      .catch((error) => {});
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    verifyuser(username, password);
  };
  useEffect(() => {
    if (isLoggedIn) {
    }

    previousToken.current = token;
    console.log("previous,current", previousToken.current, token);
    if (isLoggedIn) {
    }
  }, [token]);
  return (
    <>
      <useAuthContext.Provider value={{ isAuth, setIsAuth }}>
        <useRefreshToken></useRefreshToken>
      </useAuthContext.Provider>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></div>
        <div>Default username: default</div>
        <div>Default password: defaultpassword</div>
        Use default username and password to test the app or
      </div>{" "}
      <Link to="/register"> Create a new account</Link>
      <div>
        <Outlet
          context={[
            username,
            setUsername,
            isAuth,
            setIsAuth,
            identifier,
            setIdentifier,
            token,
            setToken,
            name1,
            setName1,
            name2,
            setName2,
          ]}
        />
      </div>
    </>
  );
}
export default Loginapp;
