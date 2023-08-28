import { useContext } from "react";
import Getinput from "./input";
import Postrequest from "./postrequest";
import url from "./url";
import { AddidentifierContext } from "./createuser";

export default function Addidentifier() {
  const {
    username,
    isaddidentifiersuccess,
    setIsaddidentifiersuccess,
    addidentifiermessage,
    setAddidentifiermessage,
    identifier,
    setIdentifier,
  } = useContext(AddidentifierContext);
  function identifierfunction(e) {
    setIdentifier(e);
  }
  const submitaddidentifier = (e) => {
    e.preventDefault();
    addidentifier(identifier).then((data) => {
      data.message === "success"
        ? setIsaddidentifiersuccess(true)
        : setIsaddidentifiersuccess(false);
    });
  };

  async function addidentifier(identifier) {
    if (identifier === "") {
      const data = { message: "Tracker name cannot be empty" };
      setAddidentifiermessage(data.message);
      setTimeout(() => {
        setAddidentifiermessage("");
      }, 1000);
      return data;
    }

    const body = {
      identifier: `${identifier.replace(/\s+/g, "-").toLowerCase()}`,
    };
    return Postrequest(`${url}/users/addidentifier/${username}`, body);
  }

  return (
    <div id="isregistersuccess">
      <div>
        <h5>
          Registration successful. Please enter a unique name for your chore
          tracker.
        </h5>
      </div>
      {/****************************************identifier************************** */}
      <div id="identifier-container">
        <Getinput
          labeltext={"Tracker name"}
          placeholdertext={"Your tracker name"}
          idtext={"identifier"}
          next={identifierfunction}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={submitaddidentifier}
        >
          Submit
        </button>
      </div>
      <small id="addidentifiererror" className="text-danger form-text">
        {addidentifiermessage}
      </small>
      {/****************************************identifier************************** */}
    </div>
  );
}
