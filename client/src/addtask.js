import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import url from "./url";
import Postrequest from "./postrequest";
import Getinput from "./input";

function Addtask({ identifier, name1, name2, list, setList, id, setID }) {
  const [showalert, setShowalert] = useState(false);
  //const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);
  const [isHidden, setIshidden] = useState(null);

  const [description, setDescription] = useState("");

  const Submittask = async (e) => {
    e.preventDefault();
    const newdescription = description
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();
    if (newdescription !== "") {
      const body = { description: newdescription, name1, name2 };
      Postrequest(`${url}/todo/${identifier}`, body)
        .then((data) => {
          if (data.message === "success") {
            setID(data.id);
            setIshidden(true);

            setTimeout(() => {
              setIshidden(null);
              setDescription("");
            }, 1000);
          } else {
            setIshidden(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setShowalert(true);
    }
  };
  useEffect(() => setID(""));

  return (
    <div
      id="addtask-container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {showalert && (
        <div style={{ color: "red" }}>The input cannot be empty.</div>
      )}
      <input
        type="text"
        autoFocus
        placeholder="Max 20 characters"
        className="mt-2 mb-0"
        value={description}
        style={{ boxShadow: "none" }}
        onChange={(e) => {
          setDescription(e.target.value);
          setIshidden(null);
          setShowalert(false);
        }}
      ></input>

      <Button
        variant="dark"
        type="submit"
        onClick={Submittask}
        className="submit mb-0"
        style={{ scale: "0.8" }}
      >
        Submit
      </Button>

      {isHidden === true && (
        <div>
          New chore:{" "}
          <span style={{ color: "blue", fontSize: "1.5em" }}>
            {description.charAt(0).toUpperCase() +
              description.slice(1).replace(/-/g, " ")}{" "}
          </span>
          added.
        </div>
      )}
      {isHidden === false && <div>Add chore failed. Please try again.</div>}
    </div>
  );
}

export default Addtask;
