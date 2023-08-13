import { useEffect, useState } from "react";
import url from "./url"

//import {sendMail} from
//const sendMail = require ('./emailer')
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
      const response = await fetch(`${url}/todo/115`, {
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
  lastdone &&
    console.log(
      lastdone,
      lastdone.slice(5, 7) < 10
        ? `0${Number(lastdone.slice(5, 7)) + 1}`
        : Number(lastdone.slice(5, 7)), //month
      lastdone.slice(8, 10) < 10
        ? `0${Number(lastdone.slice(8, 10)) + 1}`
        : Number(lastdone.slice(5, 7))
    ); //day
  console.log(todayDate);
  console.log("scheduler initiated");
  const emailer = async () => {
    try {
      const response = await fetch(`${url}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  if (lastdone && lastdone.slice(5, 10) === todayDate.slice(5, 10)) {
    const job = schedule.scheduleJob("0 38 15 * * *", () => {
      console.log(
        "Time for washing bedsheets!",
        today.format("YYYY-MM-DD-HH-mm-ss")
      );
      emailer()
        .then((result) => console.log("Reminder sent", result))
        .catch((error) => console.log(error.message));
    });
    job.cancel();
  } else if (lastdone && lastdone.slice(5, 10) !== todayDate.slice(5, 10)) {
    const job = schedule.scheduleJob("58 53 12 * * *", () => {
      console.log(
        "Time for washing bedsheets!",
        today.format("YYYY-MM-DD-HH-mm-ss")
      );
    });

    console.log("The check ran today: ", today.format("YYYY-MM-DD-HH-mm-ss"));
  }

  useEffect(() => {
    getlastdone();
  }, []);
};
export default Scheduler;
