import React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Input from "./changetaskname";
import "./App.css";
import Counter from "./counter";
import Getrequest from "./getrequest";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Lastdoneretriver from "./retrievelastdone";
import Whoreserved from "./whoreserved";
import Starbucket from "./starbucket";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Tasklist = () => {
  const [todos, setTodos] = useState([]);
  const url = `http://192.168.0.6:3000/todo`;

  let taskIndex = -1;

  let taskNames = [
    "Dishwasher",
    "Trash",
    "Mdm fann damn",
    "Toilet-roll",
    "Bedsheets",
    "Bathroom",
  ];

  useEffect(() => {
    Getrequest(url).then((x) => setTodos(x));
  }, []);

  return (
    <>
      {todos.map((todo, index) => (
        <>
          <div
            key={index}
            style={{
              backgroundColor: "transparent" /*rgb(185,191,199)",*/,
              color: "yellow",
              margin: "1rem",
              borderRadius: "1rem",
              textShadow: " 1px 0px 1px #180B07",
            }}
          >
            <h3
              style={{
                margin: "auto",
                paddingTop: window.innerWidth < 700 ? "3rem" : "7rem",
              }}
            >
              {todo.description}
              {/*  <Input gettodos={Gettodos} id={todo.todo_id} /> */}
            </h3>
            {todo.todo_id === 115 && <Whoreserved />}

            {todo.todo_id === 115 && <Lastdoneretriver />}
          </div>
          <Row xs={1} md={2} className="g-2 m-2">
            <Col>
              <Card
                className="h-90 m-2"
                style={{
                  backgroundColor:
                    "rgb(119,176,217)" /*"rgba(82, 97, 199, 0.6)"*/,
                }}
              >
                {/*<Card.Img variant="top" src="holder.js/100px160" />*/}
                <Card.Body>
                  {/*<Card.Title>Card title</Card.Title>*/}

                  <Table
                    striped={false}
                    bordered={false}
                    borderless={true}
                    hover={false}
                    tablelayout="table-fixed"
                    id="card"
                    style={{
                      color: "black",
                      height: "90%",
                    }}
                  >
                    {/* <thead>
                          <tr>
                            <th colSpan={3}>{todo.description}lala </th>
                          </tr>
                      </thead> */}
                    <tbody>
                      <tr className="same-col-widths">
                        <td>
                          <Counter
                            todo_id={todo.todo_id}
                            set_name={"hmon_count"}
                            //gettodos={Gettodos}
                          />
                        </td>

                        <td>
                          <Counter
                            todo_id={todo.todo_id}
                            set_name={"joakim_count"}
                            //gettodos={Gettodos}
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
                          {/*Array.from({ length: todo.hmon_count }, (x) => star)*/}
                        </td>

                        <td
                          rowSpan={3}
                          style={{
                            height: "15rem",
                            /*verticalAlign: "bottom",*/
                            transform: "rotate(-180deg)",
                          }}
                        >
                          {/*Array.from(
                            {
                              length:
                                todo.joakim_count > 100000
                                  ? todo.joakim_count / 100000
                                  : todo.joakim_count > 10000
                                  ? todo.joakim_count / 10000
                                  : todo.joakim_count,
                            },
                            () => star
                          )*/}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                className="h-90 m-2 "
                style={{
                  backgroundColor: "transparent",
                  border: "none",

                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/*<Card.Img variant="top" src="holder.js/100px160" />*/}
                <Card.Body>
                  {/*<Card.Title>Card title</Card.Title>*/}
                  <Card.Text>
                    <Bar
                      className="mt-5"
                      data={{
                        //labels: [taskNames[(taskIndex += 1)]],
                        labels: ["Hmon", "Joakim"],

                        datasets: [
                          {
                            label: taskNames[(taskIndex += 1)],
                            data: [todo.hmon_count, todo.joakim_count],
                            barPercentage: 0.9,
                            categoryPercentage: 0.7,
                            backgroundColor: ["#9BD0F5", "#FFB1C1"],
                            color: "white",
                            width: "100%",
                            height: "90%",
                          },
                        ],
                      }}
                      options={{
                        options: {
                          plugins: {
                            legend: {
                              display: true,
                            },
                          },
                        },
                        scales: {
                          y: {
                            display: false,
                            grid: {
                              display: false,
                            },
                            ticks: {
                              display: false, // Remove x-axis ticks
                            },
                          },
                        },
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
