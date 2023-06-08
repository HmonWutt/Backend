import Retrievelastdone from "./Retrievelastdone";
import { useEffect, useState } from "react";

const schedule = require("node-schedule");
const moment = require("moment");
let today;
let todayDate;
let nextmonthDate;
let retrievedlastdone;
today = moment();
// console.log(today);
todayDate = today.format("YYYY-MM-DD");

const Scheduler = () => {
  const [lastdone, setlastdone] = useState("");
  const getlastdone = async () => {
    try {
      const response = await fetch(`http://192.168.0.6:3000/todo/115`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      let retrievedlastdone = await response.json();
      setlastdone(retrievedlastdone.lastdone);
      //setlastdone(retrievedlastdone.lastdone);
    } catch (error) {
      console.error(error.message);
    }
  };
  console.log("scheduler initiated");

  const job = schedule.scheduleJob("0 46 14 * * *", () => {
    if (lastdone && lastdone.slice(5, 10) === todayDate.slice(5, 10)) {
      console.log(
        "Time for washing bedsheets!",
        today.format("YYYY-MM-DD-HH-mm-ss")
      );
    } else if (lastdone && lastdone.slice(5, 10) !== todayDate.slice(5, 10)) {
      console.log("The check ran today: ", today.format("YYYY-MM-DD-HH-mm-ss"));
    }
    job.cancel();
  });
  useEffect(() => {
    getlastdone();
  }, []);
};

export default Scheduler;
