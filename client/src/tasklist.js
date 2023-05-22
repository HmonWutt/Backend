import React from "react";
import { useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CardGroup from "react-bootstrap/CardGroup";

let star = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-star"
    viewBox="0 0 16 16"
  >
    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
  </svg>
);

let card = (
  <Card style={{ width: "18rem" }} id="card">
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
      <Card.Title>lala</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content. Delete
        {[...Array(16)].map((_, index) => star)}
      </Card.Text>
    </Card.Body>
  </Card>
);
const Tasklist = () => {
  const [todos, setTodos] = useState([]);

 

  const Gettodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todo", {
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
  let item_id = 0;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((element) => {
      console.log(element);
      if (element.isIntersecting) {
        console.log(element.target)
      } else {
        console.log("scroll past")
        //element.target.classList.remove("show");
      }
    });
  });
  const entries = document.querySelectorAll('#card')
  entries.forEach((element) => observer.observe(element));

  return (
    <>
      {star}
      {[...Array(6)].map((_, index) => card)}
    </>
  );
};

export default Tasklist;
