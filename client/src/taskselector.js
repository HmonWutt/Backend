import Task from "./task";
import { useEffect, useState } from "react";
import "./index.css"

const Taskselector =({taskid})=>{
console.log("taskselector", taskid)
    return(
        <Task id={taskid}/>
    )
}

export default Taskselector;