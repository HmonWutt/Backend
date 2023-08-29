import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect, useContext, useRef } from "react";
import Getrequest from "./getrequest";
import url from "./url";
import { EditDeleteContext } from "./admin_panel";
import Putrequest from "./putrequest";
import Getinput from "./input";
//import { ListContext } from "./test";

const Changetaskname = ({ list, setList, identifier, id, setID }) => {
  //const  = useContext(EditDeleteContext);
  const [changedname, setChangedname] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [description, setDescription] = useState("");
  const [modalshow, setmodalshow] = useState(false);
  const [submitmodal, setsubmitmodal] = useState(false);
  const [show, setShow] = useState(false);
  const [showalert, setShowalert] = useState(false);

  const [submitdeletemodal, setsubmitdeletemodal] = useState(false);

  const [command, setCommand] = useState([{ action: "" }, { taskID: "" }]);

  const handleClose = () => setShow(false);

  function Isemptystring() {
    if (!description) {
      setShowalert(true);
      setTimeout(() => setShowalert(false), 1000);
    } else {
      setmodalshow(true);
      handleClose();
    }
  }
  function Delete(id) {
    setCommand([{ action: "delete" }, { taskID: id }]);
    setmodalshow(true);
  }
  function Update(id) {
    setCommand([{ action: "update" }, { taskID: id }]);
    setShow(true);
  }
  function Click(command) {
    let action = command[0].action;
    let taskID = command[1].taskID;

    if (action === "update") {
      Updatedescription(taskID);
    } else {
      Deletedescription(taskID);
    }
  }

  async function Updatedescription(id) {
    try {
      const response = await fetch(`${url}/todo/${identifier}/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description.trim().replace(/\s+/g, "-").toLowerCase(),
        }),
      });
      let data = await response.json();
      if (data.message === "success") {
        setmodalshow(false);
        setID(data.id);

        setDescription("");
        setsubmitmodal(true);
        setTimeout(() => {
          setsubmitmodal(false);
        }, 1000);
      } else {
        console.log("update description failed");
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  async function Deletedescription(id) {
    try {
      const response = await fetch(`${url}/todo/${identifier}/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();

      if (data.message === "success") {
        setID(data.id);
        setmodalshow(false);

        setsubmitmodal(true);
        setTimeout(() => {
          setsubmitmodal(false);
        }, 1000);
      } else {
        console.log(`delete task ${id} failed`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => setID(""));
  return (
    list && (
      <>
        {list.map((task, taskIndex) => (
          <div
            key={taskIndex}
            id={task.todo_id}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <div>
              {task.description.charAt(0).toUpperCase() +
                task.description.slice(1).replace(/-/g, " ")}
            </div>
            <Button
              variant="warning"
              onClick={() => Update(task.todo_id)}
              className="m-1"
              style={{ scale: "0.8" }}
            >
              Edit
            </Button>
            {/********************************************************** delete**************************************/}
            <Button
              variant="danger"
              onClick={() => {
                Delete(task.todo_id);
              }}
              className="m-1"
              style={{ scale: "0.8" }}
            >
              Delete
            </Button>

            {/********************************************************** delete**************************************/}
            {show && (
              <Modal
                show={show}
                onHide={handleClose}
                className=" d-flex justify-content-center"
                style={{ marginTop: "5rem" }}
              >
                <Modal.Title className="m-2 d-flex justify-content-center">
                  Update description
                </Modal.Title>

                <Modal.Body>
                  <input
                    type="text"
                    autoFocus
                    className="m-1"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></input>
                  <Button
                    onClick={() => {
                      Isemptystring();
                    }}
                  >
                    Submit
                  </Button>
                </Modal.Body>
              </Modal>
            )}
            {modalshow && (
              <Modal show={true} onHide={() => setmodalshow(false)}>
                <Modal.Body className="p-5 d-flex justify-content-center text-danger">
                  Are you sure about this?
                </Modal.Body>
                <Modal.Footer className="p-2 d-flex justify-content-center">
                  <Button variant="warning" onClick={(e) => Click(command)}>
                    Yes
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      setmodalshow(false);
                    }}
                  >
                    No
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
            {submitmodal && (
              <Modal show={true} onHide={() => setmodalshow(false)}>
                <Modal.Body className="p-2 d-flex justify-content-center">
                  <h2>Done!</h2>
                </Modal.Body>
              </Modal>
            )}
            {showalert === true && (
              <Modal show={show} onHide={() => setShowalert(false)}>
                <Modal.Body className="text-danger ">
                  The input cannot be empty.
                </Modal.Body>
              </Modal>
            )}
          </div>
        ))}
      </>
    )
  );
};

export default Changetaskname;
