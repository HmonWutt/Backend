import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useEffect, useState } from "react";


const schedule = require("node-schedule");

// This arrangement can be altered based on how we want the date's format to appear.
let todayDate;
let nextmonthDate;
let retrievedlastdone;


const Savetoday = () => {
  const [lastdone, setlastdone] = useState("");
  const [show, setShow] = useState(false);


  const getNextmonth = () => {
    const moment = require("moment");

    const today = moment();
    todayDate = today.format("YYYY-MM-DD");
    const nextmonth = today.add(1, "month");
    nextmonthDate = nextmonth.format("YYYY-MM-DD");
    console.log("current", todayDate, "future", nextmonthDate);
    return todayDate;
  };

  const Retrievelastdone = async () => {
    try {
      const response = await fetch(`http://192.168.0.6:3000/todo/115`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      retrievedlastdone = await response.json();
      setlastdone(retrievedlastdone.lastdone);
    } catch (error) {
      console.error(error.message);
    }
  };

  const Updatedate = () => {
    const moment = require("moment");

    const today = moment();
    // console.log(today);
    todayDate = today.format("YYYY-MM-DD");
    const nextmonth = today.add(1, "month");
    nextmonthDate = nextmonth.format("YYYY-MM-DD");
    console.log(nextmonthDate);
    setlastdone(nextmonthDate);
    setShow(true)
  };

  const UndoUpdatedate = () => {
    console.log(retrievedlastdone.lastdone);
    setlastdone(retrievedlastdone.lastdone);
  };
  const Confirmupdate = async () => {
    try {
      await fetch(`http://192.168.0.6:3000/todo/115`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          set: `SET lastdone='${todayDate}', nextmonth = '${nextmonthDate}'`,
        }),
      });

    } catch (error) {
      console.error(error.message);
    }
    setShow(false)
  };

  const job = schedule.scheduleJob("* 9 * * *", () => {
    console.log("Time for tea!");
  });

  useEffect(() => {
    Retrievelastdone();
    console.log(retrievedlastdone && retrievedlastdone.lastdone);
    console.log("last done retrieved!");
  }, []);
  return (
    <>
      {lastdone ? (
        <div>last done: {lastdone}</div>
      ) : (
        <div>No last done data available</div>
      )}
      <Button onClick={Updatedate}>Update date</Button>;
      <Button onClick={UndoUpdatedate}>Undo update date</Button>;
      <Modal
        className="d-flex justify-content-center "
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Dialog className="d-flex justify-content-center m-2">
        
            <Modal.Title className="d-flex justify-content-center "><h1> 🏅🏅🏅🏅🏅🏅</h1>
             
            </Modal.Title>


          <Modal.Body className="d-flex justify-content-center">
            <h5>Choose one option.</h5>
          </Modal.Body>

          <p className="text-danger m-2">
            Once clicked, the change cannot be undone 🛑
          </p>
          <Button className="m-1" onClick={Confirmupdate} variant="warning">
            I did it by myself! 🥳{" "}
          </Button>
          <Button className="m-1" onClick={Confirmupdate} variant="primary">
            We did it together 👩‍❤️‍👨{" "}
          </Button>
          <Button className="m-1" onClick={() => setShow(false)}>
            Opps go back!
          </Button>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default Savetoday;
