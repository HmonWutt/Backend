import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ConfettiExplosion from "react-confetti-explosion";
import { useEffect, useState } from "react";


// This arrangement can be altered based on how we want the date's format to appear.
let todayDate;
let nextmonthDate;
let retrievedlastdone;

const Savetoday = (props) => {
  const Countdown = props.countdown;
  const Countup = props.countup;
  const [isExploding, setIsExploding] = useState(false);
  const [lastdone, setlastdone] = useState("");
  const [show, setShow] = useState(false);

  const Updatelastdone = async () => {
    try {
      await fetch(`http://192.168.0.6:3000/todo/bedsheet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const Retrievelastdone = async () => {
    try {
      const response = await fetch(`http://192.168.0.6:3000/todo/bedsheet`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      retrievedlastdone = await response.json();
      setlastdone(retrievedlastdone);
      console.log("retrieved", retrievedlastdone);
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
    // console.log(nextmonthDate);
    setlastdone(nextmonthDate);
    setShow(true);
    Countup();
  };

  const UndoUpdatedate = () => {
    console.log(retrievedlastdone.lastdone);
    setlastdone(retrievedlastdone.lastdone);
    Countdown();
  };
  const Confirmupdate = async () => {
    try {
      await fetch(`http://192.168.0.6:3000/todo/115`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          set: `SET lastdone='${lastdone}', nextmonth = '${nextmonthDate}'`,
        }),
      });
      Retrievelastdone();
      Updatelastdone();
    } catch (error) {
      console.error(error.message);
    }
    setShow(false);
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 2500);
  };


  useEffect(() => {
    Retrievelastdone();

    //console.log(retrievedlastdone && retrievedlastdone.lastdone);
    //console.log("last done retrieved!");
  }, []);

  useEffect(() => {
    Updatelastdone();
  }, [lastdone]);
  return (
    <>
      <div>
        {lastdone ? (
          <div className="m-3">last done: {lastdone}</div>
        ) : (
          <div>No last done data available</div>
        )}
        <div className="d-flex justify-content-evenly">
          <Button onClick={Updatedate}>Count up</Button>
          <Button onClick={UndoUpdatedate}>Undo</Button>
        </div>
      </div>

      <Modal
        className="d-flex justify-content-center "
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Dialog className="d-flex justify-content-center m-2">
          <Modal.Title className="d-flex justify-content-center ">
            <h1> 🏅🏅🏅🏅🏅🏅</h1>
          </Modal.Title>

          <Modal.Body className="d-flex justify-content-center">
            <h5>Click one of the options to save the change</h5>
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
      <>
        {isExploding && (
          <ConfettiExplosion duration={2200} particleCount={300} zIndex={2} />
        )}
      </>
    </>
  );
};

export default Savetoday;
