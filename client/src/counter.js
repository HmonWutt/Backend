import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
//import Confettitrigger from "./confetti";
import ConfettiExplosion from "react-confetti-explosion";
import Savetoday from "./savetoday";
import Getrequest from "./getrequest";
import Starbucket from "./starbucket";
import "./index.css";
import url from "./url";
import Putrequest from "./putrequest";

const Counter = (props) => {
  let set_name = props.set_name;
  let todo_id = props.todo_id;
  let identifier = props.identifier;
  const newurl = `${url}/todo/id/${todo_id}/${identifier}`;
  console.log("counter", newurl);

  const [isExploding, setIsExploding] = useState(false);
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  console.log("counter", todo_id);
  const Countup = async () => {
    const body = { set: `SET ${set_name} = ${set_name} + 1` };
    const confetti = () => {
      setIsExploding(true);
      document.getElementById(`${todo_id}`).disabled = true;
      Getrequest(newurl).then((x) => {
        setCount(x[set_name]);
      });
      setTimeout(() => {
        setIsExploding(false);
        document.getElementById(`${todo_id}`).disabled = false;
      }, 2000);
    };

    Putrequest(newurl, body, confetti);
  };

  const Countdown = async () => {
    const body = { set: `SET ${set_name} = ${set_name} - 1` };
    const getrequest = () => {
      Getrequest(newurl).then((x) => setCount(x[set_name]));
    };
    Putrequest(newurl, body, getrequest);
  };
  useEffect(() => {
    Getrequest(newurl).then((x) => {
      setCount(x[set_name]);
      console.log(set_name.slice(0, -6));
      setName(x[set_name.slice(0, -6)]);
    });
  }, [todo_id]);

  return (
    <>
      <div id="card">
        <>
          {isExploding && (
            <ConfettiExplosion duration={2200} particleCount={300} />
          )}
        </>
        <div id="name">
          {name.charAt(0).toUpperCase() + name.slice(1)}
          {/*{set_name.charAt(0).toUpperCase() + set_name.slice(1, -6)}*/}
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

            <Button
              id={todo_id}
              className="m-1"
              variant="warning"
              onClick={Countup}
            >
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
