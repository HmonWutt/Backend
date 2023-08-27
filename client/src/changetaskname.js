import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect, useContext, useRef } from "react";
import Getrequest from "./getrequest";
import url from "./url";
import { EditDeleteContext } from "./admin_panel";

const Changetaskname = () => {
  const [input, setinput] = useState("");
  const [modalshow, setmodalshow] = useState(false);
  const [submitmodal, setsubmitmodal] = useState(false);
  const [show, setShow] = useState(false);
  const [showalert, setShowalert] = useState(false);
  const [deletemodalshow, setdeletemodalShow] = useState(false);
  const [submitdeletemodal, setsubmitdeletemodal] = useState(false);
  const inputref = useRef();
  const focusInput = () => {
    inputref.current.focus();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteShow = () => setdeletemodalShow(true);
  const handlealertClose = () => {
    focusInput();
    setShowalert(false);
    console.log(inputref);
  };

  function Isemptystring() {
    if (!input) {
      setShowalert(true);
    } else {
      setmodalshow(true);
      handleClose();
    }
  }
  const { list, setList, task, identifier } = useContext(EditDeleteContext);

  const description = task.description;
  const id = task.todo_id;
  console.log("id", id);

  async function Updatedescription(id) {
    try {
      const response = await fetch(`${url}/todo/${identifier}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${token}`,
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
          //Authorization: `Bearer ${token}`,
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
      `${url}/todo/${identifier.replace(/\s+/g, "-").replace(/'+/g, "")}`
    ).then((data) => setList(data));
  }
  useEffect(() => {
    getlist();
  }, [input]);

  return (
    <div>
      {description}
      <Button
        variant="warning"
        onClick={handleShow}
        className="m-1"
        style={{ scale: "0.8" }}
      >
        Edit
      </Button>
      {/********************************************************** delete**************************************/}
      <Button
        variant="danger"
        onClick={handleDeleteShow}
        className="m-1"
        style={{ scale: "0.8" }}
      >
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
              value={input}
              ref={inputref}
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
      {showalert === true && (
        <Modal show={show} onHide={handlealertClose}>
          <Modal.Body className="text-danger ">
            The input cannot be empty.
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Changetaskname;
