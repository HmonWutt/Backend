import React, { useState, useEffect } from "react";

function Loginapp() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [usernameError, setusernameError] = useState("");
  const [forminvalid, setForminvalid] = useState(false);
  const [formsubmitted, setFormsubmitted] = useState(false);

  const handleValidation = (event) => {
    let formIsValid = true;

    if (username.length >= 5 && !usernameError && password.length >=8 && !passwordError ) {
      formIsValid = true;
    } else {
      formIsValid = false;
      setForminvalid(true)
      //setusernameError("User name cannot be empty");

    }

    return formIsValid;
  };
  function Checkusername(username) {
    setForminvalid(false);
    setUsername(username);
    if (!username.match(/^[a-zA-Z0-9()]{5,10}$/)) {
      setusernameError(
        "Only numbers and letters and at least 5 characters long"
      );
    } else {
      setusernameError("");
    }
  }
  function Checkpassword(password) {
    setForminvalid(false);
    setPassword(password);
    if (!password.match(/^[a-zA-Z0-9@#$%^&*()]{8,22}$/)) {
      setpasswordError(
        "Only numbers, letters and @ # $ % ^ & and length between 8 and 22"
      );
    } else {
      setpasswordError("");
    }
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log("handlevalidation", handleValidation(e));
    if (handleValidation(e) === true) {
      // alert(`form valid ${username}, ${password}`);
      handleValidation(e);
      setFormsubmitted(true);
      setUsername("");
      setPassword("");
      setTimeout(() => setFormsubmitted(false), 1000);
      console.log(username, password);
    } else {
      setFormsubmitted(false);
      //setForminvalid(true);
      console.log("form invalid");
    }
  };

  return (
    <div className="App">
      {/*<div className="container">
        {/*<div className="row d-flex justify-content-center"> */}
        {/*<div className="col-md-4"> */}
          <form id="loginform" onSubmit={loginSubmit}>
            {formsubmitted && (
              <p style={{ color: "yellow" }}>Form submitted successfully!</p>
            )}
            {forminvalid && (
              <p style={{ color: "yellow" }}>
                Make sure your username and password meet the requirements!
              </p>
            )}
            <div className="form-group">
              <label style={{ color: "white" }}>Username</label>
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
              <small id="emailHelp" className="text-danger form-text">
                {usernameError}
              </small>
            </div>

            <div className="form-group">
              <label style={{ color: "white" }}>Password</label>
              <br />

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
       {/*} </div>
        {/*</div>*/}
      {/*</div> */}
    </div>
  );
}
export default Loginapp;
