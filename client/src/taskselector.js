import Task from "./task";
import { useEffect, useState } from "react";
import "./index.css";

const Taskselector = ({ taskid, identifier }) => {
  //console.log("taskselector", taskid)
  return <Task id={taskid} identifier={identifier} />;
};

export default Taskselector;
