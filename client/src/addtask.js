import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import url from "./url";
import Getrequest from "./getrequest";

function Addtask({ identifier, token, name1, name2 }) {
  const [description, setDescription] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log("addtask", identifier);
  const Submittask = async (e) => {
    e.preventDefault();
    console.log("name1,name2 from add task", description, name1, name2);

    if (description !== "") {
      try {
        const body = { description, name1, name2 };
        const response = await fetch(`${url}/todo/${identifier}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });
        //window.location = "/";
        console.log(response);
      } catch (error) {
        console.error(error.message);
      }
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
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={Submittask}
          className="submit"
        >
          Add task
        </Button>
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
