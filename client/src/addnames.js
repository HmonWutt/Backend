import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AddnamesContext } from "./createuser";
import Getinput from "./input";
import Postrequest from "./postrequest";
import url from "./url";

export default function Addnames() {
  const nav = useNavigate();
  const {
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
  } = useContext(AddnamesContext);
  function nameonefunction(e) {
    setName1(e);
    setAddnamesmessage("");
  }
  function nametwofunction(e) {
    setName2(e);
    setAddnamesmessage("");
  }
  function submitnames(e) {
    console.log(name1, name2);
    addnames(name1, name2).then((data) => {
      console.log(data?.message);

      data.message === "success"
        ? addnamessuccess()
        : setIsaddnamessuccess(false);
    });
  }

  function addnamessuccess() {
    setIsaddnamessuccess(true);
    /*******************RESET EVERYTHING ************************/
    setName1("");
    setName2("");
    setUsername("");
    setPassword("");
    setIdentifier("");
    /*************************************************************/
    setTimeout(() => nav("/component"), 2000);
  }
  async function addnames(name1, name2) {
    if (name1 === "" || name2 === "") {
      const data = { message: "Names cannot be empty" };
      setAddnamesmessage(data.message);
      return data;
    }
    const body = {
      name1: name1,
      name2: name2,
    };
    return Postrequest(`${url}/users/addnames/${identifier}`, body);
  }
  return (
    <div id="isaddidentifiersuccess">
      <div style={{ margin: "1rem" }}>
        Chore tracker name added successfully 🎉.{" "}
      </div>

      <div
        style={{
          margin: "1rem",
          color: "blue",
        }}
      >
        Enter the names of two people that will use the app.
      </div>
      <div>
        <Getinput
          labeltext={"Person one"}
          placeholdertext={"Person two name"}
          idtext={"person-one"}
          next={nameonefunction}
        />
        <Getinput
          labeltext={"Person two"}
          placeholdertext={"Person two name"}
          idtext={"person-two"}
          next={nametwofunction}
        />
      </div>
      <button className="btn btn-primary" onClick={submitnames}>
        Submit
      </button>
      <small id="addnameserror" className="text-danger form-text">
        {addnamesmessage}
      </small>
    </div>
  );
}
