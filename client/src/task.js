import React from "react";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import url from "./url";
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

const Task = ({ id, identifier }) => {
  const [data, setData] = useState([]);

  const newurl = `${url}/todo/id/${id}/${identifier}`;

  useEffect(() => {
    Getrequest(newurl).then((getrequestoutput) => setData(getrequestoutput));
  }, [id]);
  return (
    <>
      <div id="task-description">
        {data ? (
          <div style={{ textTransform: "capitalize" }}>{data.description} </div>
        ) : (
          <div>No data found</div>
        )}
      </div>
      <div id="card-container">
        <Counter
          set_name={"name1_count"}
          todo_id={id}
          identifier={identifier}
        />

        <Counter
          set_name={"name2_count"}
          todo_id={id}
          identifier={identifier}
        />
      </div>
    </>
  );
};

export default Task;
