import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  useLocation,
  useNavigate,
  useOutletContext,
  Outlet,
  Link,
} from "react-router-dom";

import url from "./url";
import Getinput from "./input";
import Password from "./password";

const trackernamevariants = {
  enter: { opacity: 0, y: -100 },
  display: {
    opacity: 1,
    y: 0,
    //transition: { ease: "easeOut", duration: 1, staggerChildren: 0.5 },
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 14, //24
      staggerChildren: 0.5,
    },
  },
};

function Loginapp() {
  const [password, setPassword] = useState("");
  const [iserror, setIserror] = useState({ status: null, errormessage: "" });
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

  function usernamefunction(e) {
    setUsername(e);
  }
  function passwordfunction(e) {
    setPassword(e);
  }

  async function verifyuser(username, password) {
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
        setIserror({ status: "success", errormessage: "Login success!" });

        if (location) {
          if (location.state?.from) {
            //console.log("location", location)
            const to = location.state.from.pathname || "/component";

            nav(`${to}`);
          }
        }
        nav("/component");
      } else {
        //nav("/");

        setIserror({
          status: true,
          errormessage:
            "Username or password is incorrect. Retry or create a new account.",
        });

        setTimeout(() => {
          setIserror({ status: false, errormessage: "" });
        }, 3000);
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

  useEffect(() => {
    autologin().then((data) => {
      if (data.message === "success") {
        setIsAutoLoggingIn(true);
        setIserror({ status: "autologinfailed", errormessage: "" });
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

            nav(`${to}`);
          }
        } else {
          nav("/component");
        }
      } else {
        setIsAutoLoggingIn(false);
        nav("/");
      }
    });
  }, []);
  return (
    <>
      {!isAutoLoggingIn && (
        <section>
          <motion.div
            id="default-container"
            variants={trackernamevariants}
            initial="enter"
            animate="display"
            transition={{
              ease: "easeOut",
              duration: 1.5,
              staggerChildren: 0.2,
            }}
          >
            <h4>
              {`Welcome to choretracker!`.split("").map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </h4>
          </motion.div>
          <div id="">
            <div id="default">
              <div>
                Default username: <span className="default"> default</span>
              </div>
              <div>
                Default password:{" "}
                <span className="default">defaultpassword</span>
              </div>
            </div>
            <div id="instruction">
              <div>
                Please use the default username and password to test the app or
              </div>
              <Link id="linktoregister" to="/register">
                {" "}
                Register to create your own chore tracker
              </Link>
            </div>
          </div>{" "}
          <div className="App">
            <form id="loginform" onSubmit={loginSubmit}>
              {(iserror.status === true || iserror.status === "success") && (
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

              <Getinput
                labeltext={"Username"}
                placeholdertext={"Enter username"}
                idtext={"username"}
                next={usernamefunction}
              />

              {/* <Getinput
                labeltext={"Password"}
                placeholdertext={"Enter password"}
                idtext={"password"}
                next={passwordfunction}
              /> */}
              <Password
                labeltext={"Password"}
                placeholdertext={"Enter password"}
                idtext={"password"}
                next={passwordfunction}
              />
              <button type="submit" className="btn btn-warning">
                Log in
              </button>
            </form>
            {/* <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            ></div> */}
          </div>{" "}
          <p>
            <i>Prettifying and refactoring in progress...</i>
          </p>
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
