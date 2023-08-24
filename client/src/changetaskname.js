import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect, useContext } from "react";
import Getrequest from "./getrequest";
import url from "./url";
import { EditDeleteContext } from "./admin_panel";

const Changetaskname = () => {
  const [input, setinput] = useState("");
  const [modalshow, setmodalshow] = useState(false);
  const [submitmodal, setsubmitmodal] = useState(false);
  const [show, setShow] = useState(false);
  const [deletemodalshow, setdeletemodalShow] = useState(false);
  const [submitdeletemodal, setsubmitdeletemodal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteShow = () => setdeletemodalShow(true);

  function Isemptystring() {
    if (!input) {
      alert("Description cannot be empty!");
    } else {
      setmodalshow(true);
      handleClose();
    }
  }
  const { token, list, setList, task, identifier } =
    useContext(EditDeleteContext);

  const description = task.description;
  const id = task.todo_id;
  console.log("id", id);

  async function Updatedescription(id) {
    try {
      const response = await fetch(`${url}/todo/${identifier}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: input,
        }),
      });
      let data = await response.json();

      setmodalshow(false);

      setsubmitmodal(true);
      setTimeout(() => {
        setsubmitmodal(false);
        //window.location.reload();
      }, 1000);
      return setinput("");
    } catch (error) {
      console.error(error.message);
    }
  }

  async function Deletedescription(id) {
    try {
      await fetch(`${url}/todo/${identifier}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // body: JSON.stringify({ set: `SET description =  '${input}'` }),
      });
      setdeletemodalShow(false);
      setsubmitdeletemodal(true);
      getlist();
      setTimeout(() => {
        setsubmitdeletemodal(false);
        //window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error.message);
    }
  }

  function getlist() {
    Getrequest(
      `${url}/todo/${identifier.replace(/\s+/g, "-").replace(/'+/g, "")}`,
      token
    ).then((data) => setList(data));
  }
  useEffect(() => {
    getlist();
  }, [input]);

  return (
    <div>
      {description}
      <Button variant="primary" onClick={handleShow} className="m-3">
        Edit
      </Button>
      {/********************************************************** delete**************************************/}
      <Button variant="danger" onClick={handleDeleteShow} className="m-3">
        Delete
      </Button>
      {deletemodalshow && (
        <Modal show={true} onHide={() => setdeletemodalShow(false)}>
          <Modal.Body className="p-5 d-flex justify-content-center text-danger">
            Are you sure you want to delete this chore?
          </Modal.Body>

          <Modal.Footer className="p-2 d-flex justify-content-center">
            <Button variant="warning" onClick={() => Deletedescription(id)}>
              Yes
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setdeletemodalShow(false);
              }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {/********************************************************** delete**************************************/}
      {show && (
        <Modal
          show={show}
          onHide={handleClose}
          className="m-3 d-flex justify-content-center"
        >
          <Modal.Title className="m-2 d-flex justify-content-center">
            Update description
          </Modal.Title>

          <Modal.Body>
            <input
              type="text"
              className="m-1"
              value={input}
              onChange={(e) => setinput(e.target.value)}
            ></input>
            <Button onClick={() => Isemptystring()}>Submit</Button>
          </Modal.Body>
        </Modal>
      )}

      {modalshow && (
        <Modal show={true} onHide={() => setmodalshow(false)}>
          <Modal.Body className="p-5 d-flex justify-content-center text-danger">
            Are you sure you want to change the task name?
          </Modal.Body>

          <Modal.Footer className="p-2 d-flex justify-content-center">
            <Button variant="warning" onClick={() => Updatedescription(id)}>
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

      {submitmodal ||
        (submitdeletemodal && (
          <Modal show={true} onHide={() => setmodalshow(false)}>
            <Modal.Body className="p-2 d-flex justify-content-center">
              <h2>Done!</h2>
            </Modal.Body>
          </Modal>
        ))}
    </div>
  );
};

export default Changetaskname;
