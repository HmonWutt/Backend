import React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

const Tasklist = () => {
  const [todos, setTodos] = useState([]);
  const Gettodos = async () => {
    try {
      const response = await fetch("http://192.168.0.6:3000/todo", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    console.log("todos were fetched");
    Gettodos();
  }, []);

  return (
    <>
      <h1>hello</h1>
    </>
  );
};

export default Tasklist;
