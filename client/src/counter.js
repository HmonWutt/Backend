import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Confettitrigger from "./confetti";







const Counter = (props) => {

  let set_name = props.set_name;
  let todo_id = props.todo_id;
  const gettodos = props.gettodos;
  
  const [confettishow, setconfettishow] = useState(false)

  const Updatecount = async () => {
    try {
      const response = await fetch(`http://192.168.0.6:3000/todo/${todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ set: `${set_name}` }),
      });
      gettodos();
      setconfettishow(true)
      setTimeout(() => setconfettishow(false), 5000);
    } catch (error) {
      console.error(error.message);
    }
  };
  // useEffect(()=>{
  //   setTimeout(()=>setconfettishow(false),10000)
  // })

  return (
    <>
      <div>
        {confettishow && <Confettitrigger/>}
        <Button variant="dark" onClick={() => Updatecount()}>
          Count
        </Button>
      </div>
    </>
  );
};

export default Counter;
