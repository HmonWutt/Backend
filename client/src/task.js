import React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Input from "./input";
import "./App.css";
import Counter from "./counter";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

let star = (
  <span
    role="img"
    aria-label="sheep"
    style={{
      display: "inline-block",
      transform: "rotate(-180deg)",
      fontSize: window.innerWidth < 700 ? "0.5em" : "1em",
    }}
  >
    ⭐️
  </span>
);
const Task = ({ id }) => {
  const [data, setData] = useState([]);

  const url = `http://192.168.0.6:3000/todo/${id}`;

  useEffect(() => {
    Getrequest(url).then((getrequestoutput) => setData(getrequestoutput));
  }, []);
  return (
    <>
      <div>
        {data ? <div>{data.description}</div> : <div>No data found</div>}
      </div>
    </>
  );
};

export default Task;
