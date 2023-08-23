import React, { useState, createContext } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import "./index.css";
import Loginpage from "./registerpage";
import Addidentifier from "./addidentifier";
import Addnames from "./addnames";

export const RegisterpageContext = createContext("");
export const AddidentifierContext = createContext("");
export const AddnamesContext = createContext("");

function Createuserapp() {
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

  const [isaddidentifiersuccess, setIsaddidentifiersuccess] = useState(null);
  const [addidentifiermessage, setAddidentifiermessage] = useState("");
  const [password, setPassword] = useState("");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [isaddnamessuccess, setIsaddnamessuccess] = useState(null);
  const [isregistersuccess, setIsregistersuccess] = useState(null);
  const [addnamesmessage, setAddnamesmessage] = useState("");
  const [userexists, setUserexists] = useState(null);

  return (
    <>
      {/*****************************login page********************************** */}
      <RegisterpageContext.Provider
        value={{
          username,
          setUsername,
          password,
          setPassword,
          isregistersuccess,
          setIsregistersuccess,
          userexists,
          setUserexists,
        }}
      >
        {isregistersuccess !== true && <Loginpage />}
      </RegisterpageContext.Provider>

      {/*****************************login page********************************** */}

      {userexists && <div id="user-exists">User already exists!</div>}

      <AddidentifierContext.Provider
        value={{
          username,
          isaddidentifiersuccess,
          setIsaddidentifiersuccess,
          addidentifiermessage,
          setAddidentifiermessage,
          identifier,
          setIdentifier,
        }}
      >
        {isregistersuccess === true && !isaddidentifiersuccess && (
          <Addidentifier />
        )}
      </AddidentifierContext.Provider>

      <AddnamesContext.Provider
        value={{
          name1,
          setName1,
          name2,
          setName2,
          isaddnamessuccess,
          setIsaddnamessuccess,
          addnamesmessage,
          setAddnamesmessage,
          username,
          setUsername,
          password,
          setPassword,
          identifier,
          setIdentifier,
        }}
      >
        {isaddidentifiersuccess === true && isaddnamessuccess !== true && (
          <Addnames />
        )}
      </AddnamesContext.Provider>

      {isaddnamessuccess === true && (
        <div id="addnamessuccess">
          <div id="spinner-container">
            {Array.from({ length: 5 }, (x, index) => (
              <Spinner
                key={index}
                animation="grow"
                variant="info"
                style={{ margin: "0.5rem", size: "0.5" }}
              />
            ))}
          </div>
          <div>Names added successfully 🎉 Redirecting...</div>
        </div>
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
