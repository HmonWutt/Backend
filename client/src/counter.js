import React, { useState } from "react";
import Button from "react-bootstrap/Button";
//import Confettitrigger from "./confetti";
import ConfettiExplosion from "react-confetti-explosion";

const Counter = (props) => {

  let set_name = props.set_name;
  let todo_id = props.todo_id;
  const gettodos = props.gettodos;
  
  //const [confettishow, setconfettishow] = useState(false)
  const [isExploding, setIsExploding] = useState(false);

  const Updatecount = async () => {
    try {
       await fetch(`http://192.168.0.6:3000/todo/${todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ set: `${set_name}` }),
      });
      gettodos();
      // setconfettishow(true)
      // setTimeout(() => setconfettishow(false), 5000);
       setIsExploding(true)
       setTimeout(() => setIsExploding(false), 2500);
    
    } catch (error) {
      console.error(error.message);
    }
  };
 
  return (
    <>
      <div>
        {/*} {confettishow && <Confettitrigger />} */}

        <Button variant="dark" onClick={() => Updatecount()}>
          <>
            {isExploding && <ConfettiExplosion duration={2200} particleCount ={300} />}
          </>
          Count
        </Button>
      </div>
    </>
  );
};

export default Counter;
