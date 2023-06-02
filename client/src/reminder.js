import Button from "react-bootstrap/Button";
import { useState } from "react";
const schedule = require("node-schedule");
let second = 2;
const Reminder = (second) => {
     console.log(Date.now());
  const [show, setShow] = useState(true);
  const setReminder = () => {
    const rule = new schedule.RecurrenceRule();
    rule.minute = 26;
    rule.second = 1;
    console.log(rule);
    const startTime = new Date(Date.now() + 2000);
    const endTime = new Date(startTime.getTime() + 5000);
    const job = schedule.scheduleJob(rule, () => {
     
      console.log("Time for tea!");
    });
  };
  return <>{show && <Button onClick={setReminder}> Reminder</Button>}</>;
};

export default Reminder;
