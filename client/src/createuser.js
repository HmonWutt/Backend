import React, { useState, useEffect } from "react";

function Loginapp() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [usernameError, setusernameError] = useState("");
  const [userexists, setUserexists] = useState(false);
  const [usernotexists, setUsernotexists] = useState(false);
  let res;

  async function saveuser(username, password) {
    console.log("saveuser request sent");
    try {
      const body = { username, password };
      const response = await fetch("http://192.168.0.6:3000/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      res = await response.json();
      console.log(res.message);
      if (res.message === "Username already exists.") {
        setUserexists(true);
        setTimeout(() => setUserexists(false), 1000);
      } else {
        setUsernotexists(true);
        setUsername("");
        setPassword("");
        setTimeout(() => setUsernotexists(false), 1000);
      }

      //debugger;
    } catch (error) {
      console.error(error.message);
    }
  }

  let formIsValid = true;
  const handleValidation = (event) => {
    console.log("handleValidation ran");
    Checkusername(username);
    console.log(formIsValid);
    Checkpassword(password);
    console.log(formIsValid);
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

  function Checkusername(username) {
    setUsername(username);
    if (
      !username.match(/^[a-zA-Z0-9]{5,10}$/) ||
      username.length < 5 ||
      username.length > 10
    ) {
      formIsValid = false;

      if (
        (username.length < 5 || username.length > 10) &&
        !username.match(/^[a-zA-Z0-9]{5,10}$/)
      ) {
        setusernameError(
          "User name must be only letters and numbers and 5-10 characters long!"
        );
      } else if (!username.match(/^[a-zA-Z0-9]{5,10}$/)) {
        setusernameError("User name must be only letters and numbers !");
      } else {
        setusernameError("User name must be 5-10 characters long!");
      }
    } else {
      formIsValid = true;
      setusernameError("");
    }
  }

  function Checkpassword(password) {
    setPassword(password);
    if (
      !password.match(/^[a-zA-Z0-9@#$%^&*?()]{8,22}$/) ||
      password.length < 8 ||
      password.length > 22
    ) {
      formIsValid = false;
      if (
        !password.match(/^[a-zA-Z0-9@#$%^&*?()]{8,22}$/) &&
        (password.length < 8 || password.length > 22)
      ) {
        setpasswordError(
          "Password must be only numbers, letters or @ # $ % ^ & * ? between 8-22 characters long"
        );
      } else if (!password.match(/^[a-zA-Z0-9@#$%^&*?()]{8,22}$/)) {
        setpasswordError("Only numbers, letters or @ # $ % ^ & * ?) ( ");
      } else {
        setpasswordError("Password must be 8-22 characters long");
      }
    } else {
      setpasswordError("");
    }
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
    <div className="App">
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
              Checkusername(e.target.value);
            }}
          />
          <small id="usernameerror" className="text-danger form-text">
            {usernameError}
          </small>
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
              Checkpassword(e.target.value);
            }}
          />
        </div>
        <div>
          <small id="passworderror" className="text-danger form-text">
            {passwordError}
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Create new user
        </button>
      </form>
    </div>
  );
}
export default Loginapp;