import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
//import Confettitrigger from "./confetti";
import ConfettiExplosion from "react-confetti-explosion";
import Savetoday from "./savetoday";
import Getrequest from "./getrequest";
import Starbucket from "./starbucket";
import "./index.css";
import url from "./url";

const Counter = (props) => {
  let set_name = props.set_name;

  let todo_id = props.todo_id;
  // const gettodos = props.gettodos;

  //const [confettishow, setconfettishow] = useState(false)
  const newurl = `${url}/todo/id/${todo_id}`;

  const [isExploding, setIsExploding] = useState(false);
  const [count, setCount] = useState(0);
  console.log("counter", todo_id);
  const Countup = async () => {
    try {
      await fetch(newurl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ set: `SET ${set_name} = ${set_name} + 1` }),
      });
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 2500);
      Getrequest(newurl).then((x) => setCount(x[set_name]));
    } catch (error) {
      console.error(error.message);
    }
  };

  const Countdown = async () => {
    try {
      await fetch(newurl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ set: `SET ${set_name} = ${set_name} - 1` }),
      });
      //Getrequest(newurl).then(x=>setCount(x.set_name));
      // setconfettishow(true)
      // setTimeout(() => setconfettishow(false), 5000);
      Getrequest(newurl).then((x) => setCount(x[set_name]));
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    Getrequest(newurl).then((x) => setCount(x[set_name]));
  }, [todo_id]);

  return (
    <>
      <div id="card">
        <div id="name">
          {set_name.charAt(0).toUpperCase() + set_name.slice(1, -6)}
        </div>
        <div id="score">{count}</div>
        <Starbucket count={count} />
        <div id="button-container">
          {/*} {confettishow && <Confettitrigger />} */}

          {todo_id !== 115 ? (
            /*<Button
            variant="dark"
            onClick={() => {
              Savetoday.Updatedate();
              console.log("special button");
              setIsExploding(true);
            }}
          >
            <>
              {isExploding && (
                <ConfettiExplosion duration={2200} particleCount={300} />
              )}
              </>
            Count up
          </Button>
              ) : */

            <Button className="m-1" variant="warning" onClick={Countup}>
              <>
                {isExploding && (
                  <ConfettiExplosion duration={2200} particleCount={300} />
                )}
              </>
              Count up
            </Button>
          ) : (
            <Savetoday countup={Countup} countdown={Countdown} />
          )}

          {todo_id !== 115 ? (
            <Button className="m-1" variant="dark" onClick={Countdown}>
              Undo
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Counter;
