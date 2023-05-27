import React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import Image from "react-bootstrap/Image";
//import "./App.css";
import Counter from "./counter";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

let star = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-star"
    viewBox="0 0 16 16"
    color="yellow"
  >
    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
  </svg>
);

const Tasklist = () => {
  const [todos, setTodos] = useState([]);

  // const observer = new IntersectionObserver((entries) => {
  //   entries.forEach((element) => {
  //     if (element.isIntersecting) {
  //       element.target.classList.add("slide-in");
  //     } else {
  //       element.target.classList.remove("slide-in");
  //     }
  //   });
  // });
  const Gettodos = async () => {
    try {
      const response = await fetch(`http://192.168.0.6:3000/todo`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      setTodos(await response.json());

      // const entries = document.querySelectorAll("#card");
      //   console.log(entries);
      //   entries && entries.forEach((element) => observer.observe(element));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    Gettodos();
  }, []);

  return (
    <>
      {todos.map((todo) => (
        <>
          <Row xs={1} md={2} className="g-2">
            <Col>
              <Card className="h-100 mt-3 ">
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    <Table
                      striped={false}
                      bordered={true}
                      hover={false}
                      tableLayout="table-fixed"
                      id="card"
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        height: "100%",
                      }}
                    >
                      <thead>
                        <tr>
                          <th colSpan={3}>{todo.description}lala </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="same-col-widths">
                          <td>Hmon </td>

                          <td>Joakim</td>
                        </tr>
                        <tr className="same-col-widths">
                          <td>
                            <Counter
                              todo_id={todo.todo_id}
                              set_name={"hmon_count"}
                              gettodos={Gettodos}
                            />
                          </td>

                          <td>
                            <Counter
                              todo_id={todo.todo_id}
                              set_name={"joakim_count"}
                              gettodos={Gettodos}
                            />
                          </td>
                        </tr>
                        <tr className="same-col-widths">
                          <td
                            rowSpan={5}
                            style={{ height: "15rem", verticalAlign: "bottom" }}
                          >
                            {Array.from(
                              { length: todo.hmon_count },
                              (x) => star
                            )}
                            {todo.hmon_count}
                          </td>
                          <td
                            rowSpan={3}
                            style={{ height: "15rem", verticalAlign: "bottom" }}
                          >
                            {Array.from(
                              {
                                length:
                                  todo.joakim_count > 100000
                                    ? todo.joakim_count / 100000
                                    : todo.joakim_count > 10000
                                    ? todo.joakim_count / 10000
                                    : todo.joakim_count,
                              },
                              () => star
                            )}
                            {todo.joakim_count}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="h-100 mt-3">
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    <Bar style={{width:"80%", height: "80%"}}
                      data={{
                        labels: ["Dishwasher"],
                        datasets: [
                          {
                            label: "Hmon",
                            data: [todo.hmon_count],
                          },
                          {
                            label: "Joakim",
                            data: [todo.joakim_count],
                          },
                        ],
                      }}
                    />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      ))}
    </>
  );
};

export default Tasklist;
