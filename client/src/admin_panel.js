//name the personalised tracker
//add task/edit tasks
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import Postrequest from "./postrequest";
import Getrequest from "./getrequest";
import url from "./url";
import css from "./index.css";
import Summary from "./summary";

const AdminPanel = () => {
  const username = "Default";
  const [data, setData] = useState("");
  const [identifier, setIdentifier] = useState("Default tracker");
  const [list, setList] = useState([]);
  //////////replace " " with hypens
  const { newchorename, setNewchorename } = useState("");

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
  let tmp_list = [];
  async function getsummary() {
    Getrequest(`${url}/todo/${identifier.replace(/\s+/g, "-").toLowerCase()}`)
      .then((data) => {
        console.log(typeof data);
        console.log(data[0]);
        tmp_list.push(data);
        return tmp_list; // Returning the updated tmp_list
      })
      .then((updatedList) => {
        setList(updatedList); // Update the state with the updated list
        console.log(updatedList); // Logging the updated list
      });
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    addidentifier(identifier);
  };

  useEffect(() => {
    getsummary();
  }, []);

  return (
    <>
      {" "}
      {identifier && <div id="tracker-name">{identifier}</div>}
      <div id="admin-panel">
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
      </div>
      <Summary list={list} />
    </>
  );
};

export default AdminPanel;
