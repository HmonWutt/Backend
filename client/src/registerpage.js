import Button from "react-bootstrap/esm/Button";
import { useState, useContext, useEffect } from "react";
import Getinput from "./input";
import Postrequest from "./postrequest";
import url from "./url";
import { Checkusername, Checkpassword } from "./usernameandpassword";
import { RegisterpageContext } from "./createuser";

export default function Registerpage() {
  const [passwordError, setpasswordError] = useState("");

  const [usernameError, setusernameError] = useState("");

  const {
    username,
    setUsername,
    password,
    setPassword,
    isregistersuccess,
    setIsregistersuccess,
    userexists,
    setUserexists,
  } = useContext(RegisterpageContext);
  function usernamefunction(e) {
    setUsername(e);
    setusernameError(Checkusername(e)[1]);
    setUserexists(null);
  }
  function passwordfunction(e) {
    console.log(password);
    setPassword(e);

    setpasswordError(Checkpassword(e)[1]);
  }

  async function saveuser(username, password) {
    console.log("saveuser request sent");
    const newurl = `${url}/users/createuser`;
    const body = { username, password };
    Postrequest(newurl, body).then((data) => isuserexists(data.message));
  }

  async function isuserexists(message) {
    if (message === "Username already exists.") {
      setUserexists(true);
    } else {
      setIsregistersuccess(true);
    }
  }

  let formIsValid = true;
  const handleValidation = (event) => {
    formIsValid = Checkpassword(password)[0] && Checkusername(username)[0];

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
    }
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    handleValidation(e);
    if (formIsValid === true) {
      saveuser(username, password);
    } else {
      console.log("form invalid");
    }
  };
  useEffect(() => {
    setpasswordError("");
    setusernameError("");
  }, []);
  return (
    <>
      <div id="login-page" className="App" style={{ margin: "2rem" }}>
        <div id="username-container">
          <Getinput
            labeltext={"Username"}
            placeholdertext={"Username"}
            idtext={"username"}
            next={usernamefunction}
          />
          <small id="usernameerror" className="text-danger form-text">
            {usernameError}
          </small>
        </div>

        <div id="password-container" className="form-group m-2">
          <Getinput
            labeltext={"Password"}
            placeholdertext={"Password"}
            idtext={"password"}
            next={passwordfunction}
          />
          <small id="passworderror" className="text-danger form-text">
            {passwordError}
          </small>
        </div>

        <Button type="submit" className="btn btn-primary" onClick={loginSubmit}>
          Create new user
        </Button>
      </div>
    </>
  );
}
