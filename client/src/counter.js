import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const Counter = ({ todo_id }) => {
  const [count, setcount] = useState(0);
  console.log("todo", todo_id);
  console.log(count);
  let set = 'hmon_count'
  const Updatecount = async () => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ set:'hmon_count', hmon_count: count }),
      });
      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    Updatecount();
  }, [count]);

  return (
    <>
      <div>
        <Button variant="dark" onClick={() => setcount(count + 1)}>
          Count: {count}
        </Button>
      </div>
    </>
  );
};

export default Counter;
