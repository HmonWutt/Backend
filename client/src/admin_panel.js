//name the personalised tracker
//add task/edit tasks
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import Postrequest from "./postrequest";
import Getrequest from "./getrequest";
import url from "./url";
import css from "./index.css";
import Summary from "./summary";

const AdminPanel = ({ list, isHidden, setIsHidden }) => {
  const username = "default";
  const [data, setData] = useState("");
  const [identifier, setIdentifier] = useState("default tracker");
  // const [list, setList] = useState([]);
  //////////replace " " with hypens

  const { newchorename, setNewchorename } = useState("");
  console.log("admin panel component runs");

  const handleclick = (e) => {
    //document.getElementById("summary").classList.add("hidden")
    setIsHidden(!isHidden);
  };

  async function checkidentifier() {
    if (!identifier) {
    }
  }
  const newurl = `${url}/addidentifier/${username}`;
  console.log(newurl);

  async function addidentifier(identifier) {
    const body = {
      identifier: `'${identifier.replace(/\s+/g, "-").toLowerCase()}'`,
    };
    Postrequest(newurl, body).then((data) => console.log(data.message));
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    addidentifier(identifier);
  };

  useEffect(() => {
    console.log("admin panel use effect runs");
  }, []);

  return (
    <>
      <div
        id="admin-panel"
        style={{ visibility: isHidden ? "visible" : "hidden" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "5rem",
            justifyContent: "center",
          }}
        >
          {list.map((task, taskIndex) => (
            <div key={taskIndex}>
              <div>{task.description}</div>
            </div>
          ))}
        </div>
        {identifier && <div id="tracker-name">{identifier}</div>}
        {!identifier && (
          <form id="loginform" onSubmit={loginSubmit}>
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
                id="Username"
                name="Username"
                placeholder="Enter username"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                }}
              />
              <small
                id="usernameerror"
                className="text-danger form-text"
              ></small>

              <Button type="submit" className="btn btn-primary">
                Submit
              </Button>
            </div>
          </form>
        )}
        <div className="input">
          <label
            style={{
              color: "black",
              textShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
          ></label>
          {/* <input
            type="text"
            className="form-control m-2"
            id="Username"
            name="Username"
            placeholder="New chore name"
            value={newchorename}
            onChange={(e) => {
              setNewchorename(e.target.value);
            }}
          />
          <small id="usernameerror" className="text-danger form-text"></small>{" "} */}
          <Button type="submit" className="btn btn-primary">
            Add new chore
          </Button>
        </div>
        <Button
          onClick={(e) => {
            console.log(e.target);
          }}
          className="btn btn-primary"
        >
          Change chore name
        </Button>
        <Button onClick={handleclick}>
          {isHidden ? "Show summary" : "Close"}
        </Button>
      </div>
    </>
  );
};

export default AdminPanel;
