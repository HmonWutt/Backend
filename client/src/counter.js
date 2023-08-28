import React, { useState, useEffect, useRef } from "react";
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

  const [isExploding, setIsExploding] = useState(null);
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  let currentCountRef = useRef(null);

  const disablebButton = (updown, boolean) => {
    if (updown === "countup") {
      const disabledButton = document.getElementById(`countup${todo_id}`);
    } else {
      const disableButton = document.getElementById(`countdown${todo_id}`);
    }
    disablebButton.disabled = boolean;
    setTimeout(() => {
      disablebButton.disabled = !boolean;
    }, 2000);
  };

  const confetti = (boolean) => {
    setIsExploding(boolean);
    setTimeout(() => {
      setIsExploding(!boolean);
    }, 2000);
  };

  const countupbody = { set: `SET ${set_name} = ${set_name} + 1` };
  const countdownbody = { set: `SET ${set_name} = ${set_name} - 1` };
  const countzerobody = { set: `SET ${set_name} = 0` };

  const Count = async (body, boolean, updown) => {
    Putrequest(newurl, body)
      .then((data) => {
        console.log(data);
        if (data.message === "success") {
          disablebButton(updown, boolean);
          if (data.count < 0) {
            Count(countzerobody);
            setCount(0);
          } else {
            setCount(data.count);
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
      console.log(set_name.slice(0, -6));
      setName(x[set_name.slice(0, -6)]);
    });
  }, [todo_id]);
  useEffect(() => {
    const previousCount = currentCountRef.current;
    currentCountRef = count;
    if (currentCountRef > previousCount && currentCountRef > 0) {
      confetti(true);
    }
  }, [count]);

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
              id={`countup${todo_id}`}
              className="m-1"
              variant="warning"
              onClick={() => Count(countupbody, true, "countup")}
            >
              Count up
            </Button>
          ) : (
            <Savetoday Count={Count} />
          )}

          {todo_id !== 115 ? (
            <Button
              id={`countdown${todo_id}`}
              className="m-1"
              variant="dark"
              onClick={() => Count(countdownbody, false, "countdown")}
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
