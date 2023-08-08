import React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Input from "./input";
import Counter from "./counter";
import "./index.css";
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
import Getrequest from "./getrequest";

const Task = ({ id }) => {
  const [data, setData] = useState([]);
  console.log("task", id);

  const url = `http://192.168.0.6:3000/todo/${id}`;

  useEffect(() => {
    Getrequest(url).then((getrequestoutput) => setData(getrequestoutput));
  }, [id]);
  return (
    <>
      <div id="task-description">
        {data ? <div>{data.description}</div> : <div>No data found</div>}
      </div>
      <div id="score-display-container">
        <Counter set_name={"hmon_count"} todo_id={id} />

        <Counter set_name={"joakim_count"} todo_id={id} />
      </div>
    </>
  );
};

export default Task;
