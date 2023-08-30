import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { svg } from "./svg";
import url from "./url";

const Changetaskname = ({ list, setList, identifier, id, setID }) => {
  //const  = useContext(EditDeleteContext);

  const [description, setDescription] = useState("");
  const [modalshow, setmodalshow] = useState(false);
  const [submitmodal, setsubmitmodal] = useState(false);
  const [show, setShow] = useState(false);
  const [showalert, setShowalert] = useState(false);

  const [command, setCommand] = useState([{ action: "" }, { taskID: "" }]);

  const handleClose = () => setShow(false);

  function Isemptystring() {
    if (!description) {
      setShowalert(true);
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
                className=" d-flex justify-content-center align-items-center"
              >
                <Modal.Title className="mt-1 d-flex justify-content-center ">
                  Update description
                </Modal.Title>
                <Modal.Body>
                  {showalert && (
                    <div style={{ color: "red" }}>
                      The input cannot be empty.
                    </div>
                  )}
                  <input
                    type="text"
                    autoFocus
                    className="m-1"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setShowalert(false);
                    }}
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
              <Modal
                show={true}
                onHide={() => setmodalshow(false)}
                className=" d-flex justify-content-center align-items-center "
              >
                <Modal.Body className="ps-5 pe-5 pt-3 pb-3 modal-sm d-flex justify-content-center text-danger ">
                  Are you sure?
                </Modal.Body>
                <Modal.Footer className="p-2 d-flex justify-content-center ">
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
              <Modal
                show={true}
                onHide={() => setmodalshow(false)}
                className=" d-flex justify-content-center align-items-center "
              >
                {svg}
              </Modal>
            )}
          </div>
        ))}
      </>
    )
  );
};

export default Changetaskname;
