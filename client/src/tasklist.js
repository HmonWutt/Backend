import React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import Image from "react-bootstrap/Image";
import "./App.css";
import Counter from "./counter";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

let star = (
  <span
    role="img"
    aria-label="sheep"
    style={{
      display: "inline-block",
      transform: "rotate(-180deg)",
    }}
  >
    ⭐️
  </span>
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
          <Row xs={1} md={2} className="g-2 m-5">
            <Col>
              <Card
                className="h-100 m-5"
                style={{
                  backgroundColor: "rgba(82, 97, 199, 0.6)",
                }}
              >
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    <Table
                      striped={false}
                      bordered={false}
                      borderless={true}
                      hover={false}
                      tableLayout="table-fixed"
                      id="card"
                      style={{
                        color: "black",
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
                            style={{
                              height: "15rem",
                              /*verticalAlign: "bottom",*/ transform:
                                "rotate(-180deg)",
                            }}
                          >
                            {Array.from(
                              { length: todo.hmon_count },
                              (x) => star
                            )}
                            {todo.hmon_count}
                          </td>
                          <td
                            rowSpan={3}
                            style={{
                              height: "15rem",
                              /*verticalAlign: "bottom",*/
                              transform: "rotate(-180deg)",
                            }}
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
              <Card className="h-100 m-5">
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    <Bar
                      style={{ width: "80%", height: "80%" }}
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
