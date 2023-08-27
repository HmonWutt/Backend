import React, { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  Outlet,
  Link,
} from "react-router-dom";

import url from "./url";

function Loginapp() {
  const [password, setPassword] = useState("");
  const [iserror, setIserror] = useState({ status: false, errormessage: "" });
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const nav = useNavigate();
  const [isAutoLoggingIn, setIsAutoLoggingIn] = useState(true);

  const [
    username,
    setUsername,
    isAuth,
    setIsAuth,
    identifier,
    setIdentifier,
    name1,
    setName1,
    name2,
    setName2,
  ] = useOutletContext();
  const location = useLocation();

  async function verifyuser(username, password) {
    console.log("saveuser request sent");

    const newurl = `${url}/users/login`;
    const body = { username, password };
    try {
      const result = await fetch(newurl, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await result.json();
      if (data.message === "success") {
        setUsername(username);
        setIsloggedIn(true);
        setIdentifier(data.identifier);
        setIsloggedIn(true);
        setIsAuth(true);
        setName1(data.name1);
        setName2(data.name2);

        if (location) {
          if (location.state?.from) {
            //console.log("location", location)
            const to = location.state.from.pathname || "/component";
            console.log("to", to);
            nav(`${to}`);
          }
        }
        nav("/component");
      } else {
        nav("/");
        setIserror({
          status: true,
          errormessage:
            "Username or password is incorrect. Retry or create a new account.",
        });
        setTimeout(() => {
          setIserror({ status: false, errormessage: "" });
        });
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    verifyuser(username, password);
  };
  async function autologin() {
    console.log("autologin runs");
    const newurl = `${url}/users/autologin`;
    try {
      const response = await fetch(newurl, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect((location) => {
    autologin().then((data) => {
      if (data.message === "success") {
        console.log("data", data);
        setIsAutoLoggingIn(true);
        setIserror("success");
        setUsername(username);
        setIsloggedIn(true);
        setIdentifier(data.identifier);
        setIsloggedIn(true);
        setIsAuth(true);
        setName1(data.name1);
        setName2(data.name2);

        if (location) {
          if (location.state?.from) {
            const to = location.state.from.pathname || "/component";
            console.log("to", to);
            nav(`${to}`);
          }
        }
        nav("/component");
      } else {
        setIsAutoLoggingIn(false);
        nav("/");
      }

      setIserror({
        status: true,
        errormessage: "Session expired. Please log in again.",
      });
      setTimeout(() => {
        setIserror({ status: false, errormessage: "" });
      });
    });
  }, []);
  return (
    <>
      {!isAutoLoggingIn && (
        <section>
          {" "}
          <div className="App">
            <form id="loginform" onSubmit={loginSubmit}>
              <div
                style={{
                  color: "yellow",
                  fontSize: "1.5em",
                  /* */
                }}
              ></div>

              {iserror.status === true && (
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
                  {iserror.errormessage}
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
                <small
                  id="usernameerror"
                  className="text-danger form-text"
                ></small>
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
                <small
                  id="passworderror"
                  className="text-danger form-text"
                ></small>
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
          </div>
          <Link to="/register"> Create a new account</Link>
        </section>
      )}
      <div>
        <Outlet
          context={[
            username,
            setUsername,
            isAuth,
            setIsAuth,
            identifier,
            setIdentifier,
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
