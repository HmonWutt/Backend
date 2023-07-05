const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

//middleware

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("Server has started on port 3000");
});
////////////////////////////////////google api///////////////////////////////
const {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
} = require("./google-credentials");
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

////////////////////////////////scheduler//////////////////////
const schedule = require("node-schedule");
const moment = require("moment");
let today;
let todayDate;
let nextmonthDate;
let retrievedlastdone;
today = moment();
// console.log(today);
todayDate = today.format("YYYY-MM-DD");

///////////////////////////////////////////////////

app.post("/todo", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//////////////////////////////////////START OF EMAAILER/////////////////////////////////////////
const emailer = async (req, res) => {
  try {
    const AccessToken = await oAuth2Client.getAccessToken();
    const Transport = nodemailer.createTransport({
      service: "gmail",

      auth: {
        type: "OAuth2",
        user: "wtthumon@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: AccessToken,
      },
    });

    const mailOptions = {
      from: "Remidder 🔔 <wtthumon@gmail.com>",
      to: "wtthumon@gmail.com",
      subject: "This is a reminder to clean bedsheets",
      text: "This is a reminder to clean bedsheets",
      html: "<h3>This is a reminder to clean bedsheets</h3>",
    };
    const result = await Transport.sendMail(mailOptions);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

app.post("/email", emailer);

app.get("/todo/bedsheet", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todo WHERE todo_id = 115");
    const lastdone = result.rows[0].lastdone;
    res.json(lastdone);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
const triggeremailer = async () => {
  try {
    const response = await fetch(`http://192.168.0.6:3000/email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error.message);
  }
};

const Getlastdone = async () => {
  try {
    const response = await fetch(`http://192.168.0.6:3000/todo/bedsheet`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    let lastdone = await response.json();
    console.log("lastdone:", lastdone);

    let day;
    let month;
    if (
      Number(lastdone.slice(5, 7)) + 1 === 2 &&
      Number(lastdone.slice(8, 10)) > 28
    ) {
      day = "28";
      month = "2";
    } else {
      day = lastdone.slice(8, 11);
      //lastdone.slice(8, 10) < 10
      //   ? `0${Number(lastdone.slice(8, 10)) + 1}`
      //   : `Number(lastdone.slice(8, 10)) + 1`;
      month = Number(lastdone.slice(5, 7)) + 1;
      // lastdone.slice(5, 7) < 10
      //   ? `0${Number(lastdone.slice(5, 7)) + 1}`
      //   : `Number(lastdone.slice(5, 7)) + 1`; //month
    }

    let year = lastdone.slice(0, 4);
    day = "5";
    month = "7";

    let scheduleddate = year + "-" + month + "-" + day;
    let crondate = `29 16 ${day} ${month} *`;
    //crondate = "57 15 5 7 *";
    console.log("scheduleddate:", scheduleddate);
    console.log("crondate", crondate);

    const job = schedule.scheduleJob(crondate, () => {
      console.log(
        "Time for washing bedsheets!",
        today.format("YYYY-MM-DD-HH-mm-ss")
      );

      triggeremailer()
        .then((result) => console.log("Reminder sent", result))
        .catch((error) => console.log(error.message));
    });
  } catch (error) {
    console.error(error.message);
  }
};

Getlastdone();
///////////////////////////////////////////////////////END OF EMAILER////////////////////////////////////////////

app.get("/todo", async (req, res) => {
  try {
    const allTodos = await pool.query(
      "SELECT * FROM todo ORDER BY todo_id ASC"
    );
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const specific_todo = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1 ",
      [id]
    );
    res.json(specific_todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

app.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { set } = req.body;
    console.log(set);

    const updateTOdo = await pool.query(
      `UPDATE todo ${set}  WHERE todo_id = $1`,
      [id]
    );
    res.json(`To do id:${id} of set:${set} was updated`);
  } catch (error) {
    console.error(error.message);
  }
});

app.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(`Todo ${id} was deleted!`);
  } catch (err) {
    console.log(err.message);
  }
});
