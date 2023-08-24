import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import url from "./url";
import Getrequest from "./getrequest";
import Postrequest from "./postrequest";
import Changetaskname from "./changetaskname";

function Addtask({ identifier, token, name1, name2 }) {
  const [description, setDescription] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isHidden, setIshidden] = useState(null);

  const Submittask = async (e) => {
    e.preventDefault();
    console.log("name1,name2 from add task", description, name1, name2);

    if (description !== "") {
      const body = { description, name1, name2 };
      Postrequest(`${url}/todo/${identifier}`, body, token)
        .then((data) => {
          if (data.message === "success") {
            setIshidden(true);
            setTimeout(() => {
              setIshidden(null);
              setDescription("");
            }, 2000);
          } else {
            setIshidden(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      handleShow();
    }
  };

  return (
    <>
      <Form className="text-center mt-3">
        <Form.Group className="mb-3 " controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Max 200 characters"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setIshidden(null);
            }}
          />
        </Form.Group>

        <Button
          variant="dark"
          type="submit"
          onClick={Submittask}
          className="submit"
        >
          Submit
        </Button>

        <div style={{ visibility: isHidden === true ? "visible" : "hidden" }}>
          New chore: <span style={{ color: "blue" }}>{description} </span>
          added.
        </div>

        <div style={{ visibility: isHidden === false ? "visible" : "hidden" }}>
          Add chore failed. Please try again.
        </div>

        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Body className="text-danger ">
              The input cannot be empty.
            </Modal.Body>
          </Modal>
        </>
      </Form>
    </>
  );
}

export default Addtask;
