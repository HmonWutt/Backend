import Button from "react-bootstrap/esm/Button";
import { useState, useEffect } from "react";

function Reserve({ name, input }) {
  let disabledname;
 
  const Updatereservedname = async () => {

    try {
      await fetch(`http://192.168.0.6:3000/todo/115`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ set: `SET ${input} = 'true'` }),
      });
    } catch (error) {
      console.error(error.message);
    }
    name === "Hmon" ? (disabledname = "joakim") : (disabledname = "hmon");
    console.log(name);
    try {
      await fetch(`http://192.168.0.6:3000/todo/115`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ set: `SET ${disabledname}_reserve = 'false'` }),
      });
    } catch (error) {
      console.error(error.message);
    }
     Showname();
 
  };
  function Showname() {
    let list = document.querySelectorAll("#disable");
    let elementarray = Array.from(list);
    //.foreach((item) => item.classList.add("disabled"));
    console.log(list);
    elementarray.map((item) => item.classList.add('disabled'));
  }


  return (
    <>
      <Button className="m-1" id="disable" onClick={Updatereservedname}>
        Reserve
      </Button>
      
    </>
  );
}

export default Reserve;
