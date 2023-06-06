import React, { useState } from "react";
import Button from "react-bootstrap/Button";
//import Confettitrigger from "./confetti";
import ConfettiExplosion from "react-confetti-explosion";
import Savetoday from "./savetoday";

const Counter = (props) => {
  let set_name = props.set_name;
  let todo_id = props.todo_id;
  const gettodos = props.gettodos;

  //const [confettishow, setconfettishow] = useState(false)
  const [isExploding, setIsExploding] = useState(false);
  const Countup = async () => {
    try {
      await fetch(`http://192.168.0.6:3000/todo/${todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ set: `SET ${set_name} = ${set_name} + 1` }),
      });
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 2500);
      gettodos();
    } catch (error) {
      console.error(error.message);
    }
  };

  const Countdown = async () => {
    try {
      //console.log(typeof set_name);
      await fetch(`http://192.168.0.6:3000/todo/${todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ set: `SET ${set_name} = ${set_name} - 1` }),
      });
      gettodos();
      // setconfettishow(true)
      // setTimeout(() => setconfettishow(false), 5000);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
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
          <Button variant="dark" onClick={Countup}>
            <>
              {isExploding && (
                <ConfettiExplosion duration={2200} particleCount={300} />
              )}
            </>
            Count up
          </Button>
        ) : ( 
          <Savetoday countup = {Countup} countdown={Countdown}/>
         
            
        )}

        {todo_id !== 115 ? (
          <Button variant="dark" onClick={Countdown}>
            Undo
          </Button>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Counter;
