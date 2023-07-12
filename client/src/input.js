import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

const Input = ({ gettodos, id }) => {
  const [input, setinput] = useState("");
  const [modalshow, setmodalshow] = useState(false);
  const [submitmodal, setsubmitmodal] = useState(false);
  const [show, setShow] = useState(false);
  const [emptystringmodal, setShowemptystringmodal] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  function Isemptystring() {
    if (!input)
    {
    alert("Description cannot be empty!")}
      
    else {
      setmodalshow(true);
      handleClose();
    }
  }

  async function Updatedescription(id) {
    try {
      await fetch(`http://192.168.0.6:3000/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ set: `SET description =  '${input}'` }),
      });
      setmodalshow(false);
      gettodos();
      setsubmitmodal(true);
      setTimeout(() => {
        setsubmitmodal(false);
      }, 1000);
      return setinput("");
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      <Button variant="primary" onClick={handleShow} className="m-3">
        Update description
      </Button>

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

      {submitmodal && (
        <Modal show={true} onHide={() => setmodalshow(false)}>
          <Modal.Body className="p-2 d-flex justify-content-center">
            <h2>Done!</h2>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Input;
