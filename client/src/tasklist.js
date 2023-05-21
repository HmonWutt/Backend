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
   let item_id = 0
  return (
    <>
    
      <Table striped='false' bordered='false' hover='false'>
        <thead>
          <tr>
            <th>No.</th>
            <th>Task Description</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody> 
            {todos.map(todo=><tr key={todo.todo_id}>
           
            <td>{item_id+=1}</td>
            <td>{todo.description}</td>
            <td>Edit</td>
            <td>Delete</td>
          </tr>)}
          
         
        </tbody>
      </Table>
    </>
  );
};

export default Tasklist;
