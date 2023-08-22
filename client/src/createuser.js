import React, { useState, useEffect } from "react";
import { Outlet, useOutletContext, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import Postrequest from "./postrequest";
import url from "./url";
import { Checkpassword, Checkusername } from "./usernameandpassword";

function Createuserapp() {
  const [password, setPassword] = useState("");
  const [
    username,
    setUsername,
    isAuth,
    setIsAuth,
    identifier,
    setIdentifier,
    token,
    setToken,
  ] = useOutletContext();
  const [passwordError, setpasswordError] = useState("");
  const [usernameError, setusernameError] = useState("");
  const [userexists, setUserexists] = useState(false);
  const [usernotexists, setUsernotexists] = useState(false);
  const [isregistersuccess, setIsregistersuccess] = useState(false);
  const [isaddidentifiersuccess, setIsaddidentifiersuccess] = useState(null);
  const [addidentifiermessage, setAddidentifiermessage] = useState("");
  const nav = useNavigate();

  async function saveuser(username, password) {
    console.log("saveuser request sent");

    const newurl = `${url}/users/createuser`;
    const body = { username, password };
    Postrequest(newurl, body).then((data) => isuserexists(data.message));
  }

  async function isuserexists(message) {
    if (message === "Username already exists.") {
      console.log("username already taken");
      setTimeout(() => setUserexists(false), 1000);
    } else {
      setUsernotexists(true);
      console.log("get postrequest to return username and pass to root");
      setIsregistersuccess(true);
      setTimeout(() => setUsernotexists(false), 1000);
    }
  }

  var formIsValid = true;
  const handleValidation = (event) => {
    console.log("handleValidation ran");
    formIsValid = Checkpassword(password)[0] && Checkusername(username)[0];
    console.log("formisvalid", formIsValid);
    console.log("username", username, "password", password);
    if (username === "" || password === "") {
      formIsValid = false;
      if (username === "" && password === "") {
        setpasswordError("Password cannot be empty!");
        setusernameError("User name cannot be empty");
      } else if (username === "") {
        setusernameError("User name cannot be empty!");
      } else {
        setpasswordError("Password cannot be empty");
      }
      setTimeout(() => {
        setusernameError("");
        setpasswordError("");
      }, 2000);
    }
  };

  const submitaddidentifier = (e) => {
    e.preventDefault();
    addidentifier().then((data) => {
      console.log(data.message);
      setAddidentifiermessage(data.message);
      data.message === "success"
        ? addsuccess()
        : setIsaddidentifiersuccess(false);
    });
  };
  function addsuccess() {
    setIsaddidentifiersuccess(true);
    setIdentifier("");
    setUsername("");
    setPassword("");
    setTimeout(() => nav("/component"), 2000);
  }

  async function addidentifier() {
    const body = {
      identifier: `${identifier.replace(/\s+/g, "-").toLowerCase()}`,
    };
    console.log("add identifier to", `${url}/users/addidentifier/${username}`);

    return Postrequest(`${url}/users/addidentifier/${username}`, body);
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    handleValidation(e);
    // saveuser(username, password);

    if (formIsValid === true) {
      saveuser(username, password);
    } else {
      console.log("form invalid");
    }
  };

  return (
    <>
      {isregistersuccess !== true && (
        <div id="login-page" className="App" style={{ margin: "2rem" }}>
          <form id="loginform" onSubmit={loginSubmit}>
            <div
              style={{
                color: "yellow",
                fontSize: "1.5em",
                /* */
              }}
            ></div>

            {userexists && (
              <div
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  padding: "1rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "rgb(254, 98, 98)",
                  margin: "0.5rem",
                }}
                id="status"
              >
                User already exists!
              </div>
            )}
            {usernotexists && (
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
                User created successfully!
              </div>
            )}
            <div className="form-group m-2">
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
                className="form-control"
                id="Username"
                name="Username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setusernameError(Checkusername(e.target.value));
                }}
              />
              <div>
                {" "}
                <small id="usernameerror" className="text-danger form-text">
                  {usernameError}
                </small>
              </div>
            </div>
            <div id="password" className="form-group m-2">
              <label
                style={{
                  color: "black",
                  textShadow:
                    "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                }}
              >
                Password
              </label>

              <div className="input-container">
                <input
                  type="password"
                  className="form-control "
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setpasswordError(Checkpassword(e.target.value)[1]);
                  }}
                />
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>

              <Button type="submit" className="btn btn-primary">
                Create new user
              </Button>
            </div>
          </form>
        </div>
      )}
      {isregistersuccess === true && !isaddidentifiersuccess && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            margin: "2rem",
          }}
        >
          <div>
            <h4>
              Registration successful. Please enter a unique name for your chore
              tracker.
            </h4>
          </div>
          <div>
            <form
              id="loginform"
              onSubmit={submitaddidentifier}
              style={{ maxWidth: "20rem" }}
            >
              <div className="input">
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
                  id="identifier"
                  name="identifier"
                  placeholder="Enter tracker name"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                  }}
                />
                <small
                  id="usernameerror"
                  className="text-danger form-text"
                ></small>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isaddidentifiersuccess === true && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div>
            <Spinner
              animation="grow"
              variant="info"
              style={{ margin: "0.5rem" }}
            />

            <Spinner
              animation="grow"
              variant="info"
              style={{ margin: "0.5rem" }}
            />

            <Spinner
              animation="grow"
              variant="info"
              style={{ margin: "0.5rem" }}
            />
          </div>
          <div>Chore tracker name added successfully 🎉. Redirecting....</div>
        </div>
      )}
      {isaddidentifiersuccess === false && (
        <div style={{ color: "red" }}>{addidentifiermessage}😭 </div>
      )}
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
        ]}
      />
    </>
  );
}
export default Createuserapp;
