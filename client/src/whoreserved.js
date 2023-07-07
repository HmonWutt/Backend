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
    Disablereservebutton();
  };
  let joakim;
  let hmon;
  async function Disablereservebutton() {
    try {
      const response = await fetch(`http://192.168.0.6:3000/todo/115`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let reserved = await response.json();
      joakim = reserved.joakim_reserve;
      hmon = reserved.hmon_reserve;

      console.log("disabled button run", joakim, hmon);
      let list = document.querySelectorAll("#disable");
      let elementarray = Array.from(list);
      //.foreach((item) => item.classList.add("disabled"));
      console.log(list);
      if (joakim === true || hmon === true) {
        console.log("one true");
        console.log("new reservedname run", "joakim", joakim, "hmon", hmon);

        elementarray.map((item) => item.classList.add("disabled"));
        if (joakim === true) {
          setReservedname("Joakim");
        } else if (hmon === true) {
          setReservedname("Hmon");
        }
      } else {
        elementarray.map((item) => item.classList.remove("disabled"));
        setReservedname("No one");
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
      <p className="text-danger">{`${reservedname} has reserved this task ⏰`}</p>
      <Button
        id="disable"
        onClick={() => {
          Reservedtrue("hmon");
        }}
      >
        Hmon reserve
      </Button>
      <Button
        id="disable"
        onClick={() => {
          Reservedtrue("joakim");
        }}
      >
        Joakim reserve
      </Button>
      <Button
        onClick={() => {
          Reservedfalse("hmon");
        }}
      >
        Hmon unreserve
      </Button>
      <Button
        onClick={() => {
          Reservedfalse("joakim");
        }}
      >
        Joakim unreserve
      </Button>
    </>
  );
}

export default Whoreserved;
