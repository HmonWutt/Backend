import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
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

  const [isExploding, setIsExploding] = useState(null);
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const disablebButton = (e) => {
    e.disabled = true;
    setTimeout(() => {
      e.disabled = false;
    }, 1000);
  };

  const confetti = (boolean) => {
    setIsExploding(boolean);
    setTimeout(() => {
      setIsExploding(false);
    }, 2000);
  };

  const countupbody = { set: `SET ${set_name} = ${set_name} + 1` };
  const countdownbody = { set: `SET ${set_name} = ${set_name} - 1` };
  const countzerobody = { set: `SET ${set_name} = 0` };

  const Count = async (body, boolean) => {
    Putrequest(newurl, body)
      .then((data) => {
        if (data.message === "success") {
          if (data.count < 0) {
            Count(countzerobody);
            setCount(0);
            confetti(false);
          } else {
            setCount(data.count);
            confetti(boolean);
          }
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => {
        console.log("Count update failed", error.message);
      });
  };

  useEffect(() => {
    Getrequest(newurl).then((x) => {
      setCount(x[set_name]);
      setName(x[set_name.slice(0, -6)]);
    });
  }, [todo_id]);

  return (
    <>
      <div id="card">
        <>
          {isExploding === true && (
            <ConfettiExplosion duration={2200} particleCount={300} />
          )}
        </>
        <div id="name">{name.charAt(0).toUpperCase() + name.slice(1)}</div>
        <div id="score">{count}</div>
        <Starbucket count={count} />
        <div id="button-container">
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
              className="m-1"
              variant="warning"
              onClick={(e) => {
                Count(countupbody, true);
                disablebButton(e.currentTarget);
              }}
            >
              Count up
            </Button>
          ) : (
            <Savetoday Count={Count} />
          )}

          {todo_id !== 115 ? (
            <Button
              className="m-1"
              variant="dark"
              onClick={(e) => {
                Count(countdownbody, false);
                disablebButton(e.currentTarget);
              }}
            >
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
