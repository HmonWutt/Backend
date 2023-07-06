import { useState, useEffect } from "react";

function Whoreserved() {
 const [reservedname, setReservedname] = useState("");
  async function Reserved() {
      const [name, setName] = useState("");
    try {
      const response = await fetch(`http://192.168.0.6:3000/todo/115`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let reserved = await response.json();
      let joakim = reserved.joakim_reserve;
      let hmon = reserved.hmon_reserve;

      console.log("who", joakim, hmon);

      //.foreach((item) => item.classList.add("disabled"));
      if (joakim === true) {
        setName("Joakim");
      } else if (hmon === true) {
        setName("Hmon");
      }
      else{
        setName("No one")
      }
      name && console.log(name);
    } catch (error) {
      console.error(error.message);
    }  
    Reserved()
    setReservedname(name)

  }   


  return (
   <p className="text-danger">{`${reservedname} has reserved this task ⏰`}</p>
  );
}

export default Whoreserved;
