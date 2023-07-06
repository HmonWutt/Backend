import Button from "react-bootstrap/esm/Button";
import { useState, useEffect } from "react";

function Whoreserved() {
  const [reservedname, setReservedname] = useState(" ");

  const Reservedtrue = async (name) => {
    try {
      await fetch(`http://192.168.0.6:3000/todo/115`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ set: `SET ${name}_reserve = 'true'` }),
      });
    } catch (error) {
      console.error(error.message);
    }

    Disablereservebutton();
  };

  const Reservedfalse = async (name) => {
    console.log(name);
    try {
      await fetch(`http://192.168.0.6:3000/todo/115`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ set: `SET ${name}_reserve = 'false'` }),
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  async function Disablereservebutton() {
    let joakimreserved;
    let hmonreserved;
    try {
      const response = await fetch(`http://192.168.0.6:3000/todo/115`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let reserved = await response.json();
      joakimreserved = reserved.joakim_reserve;
      hmonreserved = reserved.hmon_reserve;

      console.log(joakimreserved, hmonreserved);
      let list = document.querySelectorAll("#disable");
      let elementarray = Array.from(list);
      //.foreach((item) => item.classList.add("disabled"));
      console.log(list);
      if (joakimreserved === true || hmonreserved === true) {
        console.log("one true");
        elementarray.map((item) => item.classList.add("disabled"));
      } else {
        elementarray.map((item) => item.classList.remove("disabled"));
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  let joakim;
  let hmon;
  async function Reserved() {
    try {
      const response = await fetch(`http://192.168.0.6:3000/todo/115`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let reserved = await response.json();
      joakim = reserved.joakim_reserve;
      hmon = reserved.hmon_reserve;

      console.log("who", joakim, hmon);
    } catch (error) {
      console.error(error.message);
    }
    if (joakim === true) {
      setReservedname("Joakim");
    } else if (hmon === true) {
      setReservedname("Hmon");
    } else {
      setReservedname("No one");
    }
  }
  console.log(reservedname);
  
  useEffect(() => {
    Reserved();
  });
  useEffect(() => {
  Disablereservebutton();
 });
  return (
    <>
      <p className="text-danger">{`${reservedname} has reserved this task ⏰`}</p>
      <Button
        id="disable"
        onClick={() => {
          Reservedtrue("hmon");
          Reserved();
        }}
      >
        Hmon reserve
      </Button>
      <Button
        id="disable"
        onClick={() => {
          Reservedtrue("joakim");
          Reserved();
        }}
      >
        Joakim reserve
      </Button>
      <Button
        onClick={() => {
          Disablereservebutton();
          Reservedfalse("hmon");
          Reserved();
        }}
      >
        Hmon unreserve
      </Button>
      <Button
        onClick={() => {
          Disablereservebutton();
          Reservedfalse("joakim");
          Reserved();
        }}
      >
        Joakim unreserve
      </Button>
    </>
  );
}

export default Whoreserved;
