import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

const Input = ({ gettodos, id }) => {
  const [inputshow, setiputshow] = useState(false);
  const [input, setinput] = useState("");
  const [modalshow, setmodalshow] = useState(false);
  const [submitmodal, setsubmitmodal] = useState(false);

  async function Updatedescription(id) {
    try {
      await fetch(`http://192.168.0.6:3000/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ set: `SET description =  '${input}'` }),
      });
      setmodalshow(false);
      setiputshow(false);
      gettodos();
      setinput("");
      setsubmitmodal(true);
      setTimeout(() => setsubmitmodal(false), 1000);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      <Button variant="dark" className="m-1" onClick={() => setiputshow(true)}>
        Update Description
        {inputshow && (
          <>
            <input
              type="text"
              className="m-1"
              value={input}
              onChange={(e) => setinput(e.target.value)}
            ></input>
            <Button onClick={() => setmodalshow(true)}>Submit</Button>
          </>
        )}
      </Button>
      {modalshow && (
        <div
          className="modal show bg-transparent"
          style={{
            display: "block",
            position: "initial",
          }}
        >
          <Modal.Dialog className="bg-transparent">
            <Modal.Body>
              <p style={{ color: "red" }}>
                Are you sure you want to change the task name?
              </p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="warning" onClick={() => Updatedescription(id)}>
                Yes
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setiputshow(false);
                  setmodalshow(false);
                }}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
      {submitmodal && (
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal.Dialog>
            <Modal.Body style={{ color: "black" }}>
              <p>Task Name changed successfully!</p>
            </Modal.Body>
          </Modal.Dialog>
        </div>
      )}
    </div>
  );
};

export default Input;
