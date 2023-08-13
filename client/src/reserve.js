import Button from "react-bootstrap/esm/Button";
import { useState, useEffect } from "react";
import url from "./url"

function Reserve({ name, input }) {
  let unreservedname;

  const Reservedtrue = async () => {
    try {
      await fetch(`${url}/todo/115`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ set: `SET ${input} = 'true'` }),
      });
    } catch (error) {
      console.error(error.message);
    }
    name === "Hmon" ? (unreservedname = "joakim") : (unreservedname = "hmon");
    console.log(name);
    try {
      await fetch(`${url}/todo/115`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          set: `SET ${unreservedname}_reserve = 'false'`,
        }),
      });
    } catch (error) {
      console.error(error.message);
    }
    Disablereservebutton();
  };

  const Reservedfalse = async () => {
    try {
      await fetch(`${url}/todo/115`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ set: `SET ${input} = 'false'` }),
      });
    } catch (error) {
      console.error(error.message);
    }

    Disablereservebutton();
  };

  async function Disablereservebutton() {
    let joakimreserved;
    let hmonreserved;
    try {
      const response = await fetch(`${url}/todo/115`, {
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
      }
      else {
         elementarray.map((item) => item.classList.remove("disabled"));
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    Disablereservebutton();
  }, []);

  return (
    <>
      <Button className="m-1" id="disable" onClick={()=>Reservedtrue("Hmon")}>
        Hmon Reserve
      </Button>
      <Button className="m-1" id="disable" onClick={()=>Reservedtrue("Joakim")}>
        Joakim Reserve
      </Button>
      <Button className="m-1" onClick={Reservedfalse}>
        Unreserve
      </Button>
    </>
  );
}

export default Reserve;
