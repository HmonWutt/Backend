const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const authRoutetodo = require("./routes/auth_todo");
const authRouteusers = require("./routes/auth_users.js");

const url = `http://192.168.0.6:3000`;

//middleware

app.use(cors());
app.use(express.json());

/////////////auth route////////////////
app.use("/todo", authRoutetodo);
app.use("/users", authRouteusers);
///////////////////////////////////////////
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

async function Getlastdone() {
  try {
    const response = await fetch(`${url}/todo/bedsheet`, {
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
      day = 28;
      month = "2";
    } else {
      day = Number(lastdone.slice(8, 11));
      //lastdone.slice(8, 10) < 10
      //   ? `0${Number(lastdone.slice(8, 10)) + 1}`
      //   : `Number(lastdone.slice(8, 10)) + 1`;
      month = Number(lastdone.slice(5, 7)) + 1;
      // lastdone.slice(5, 7) < 10
      //   ? `0${Number(lastdone.slice(5, 7)) + 1}`
      //   : `Number(lastdone.slice(5, 7)) + 1`; //month
    }
    day = day - 3;
    let year = lastdone.slice(0, 4);

    let scheduleddate = year + "-" + month + "-" + day;
    let crondate = `50 07 ${day} ${month} *`;
    //crondate = "31 12 6 7 *";

    //console.log("scheduleddate:", scheduleddate);
    console.log("crondate", crondate);

    const job = schedule.scheduleJob(crondate, () => {
      console.log(
        "Time for washing bedsheets!",
        today.format("YYYY-MM-DD-HH-mm-ss")
      );
      Reset();
      emailer()
        .then((result) => console.log("Reminder sent", result))
        .catch((error) => console.log(error.message));

      async function Reset() {
        try {
          await fetch(`${url}todo/115`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              set: `SET joakim_reserve = 'false' , hmon_reserve = 'false'`,
            }),
          });
          console.log("reservation reset done");
        } catch (error) {
          console.error(error.message);
        }
      }
    });
  } catch (error) {
    console.error(error.message);
  }
}

Getlastdone();
///////////////////////////////////////////////////////END OF EMAILER////////////////////////////////////////////

/////////////////////////////////////create table/delete table/ add column/ delete column//////////////////////////////////

app.post("/create-table/:tablename", async (req, res) => {
  res.send("create table requested");
  try {
    const { person1_name, person2_name } = req.body;
    const { tablename } = req.params;
    console.log("create table requested");
    console.log(req.body.person1_name);

    const newTable = await pool.query(
      `CREATE TABLE ${tablename} (
      id serial PRIMARY KEY,
      description VARCHAR(100) NOT NULL,
      ${person1_name} integer,
      ${person2_name} integer
    )`
    );
    const table = res.json(newTable.rows[0]);
    console.log("this was called");
    // console.log(table)
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/create-table", async (req, res) => {
  res.send("hello, request to create table received");
  console.log("create table ");
});

app.delete("/delete-table/:tablename", async (req, res) => {
  try {
    const { tablename } = req.params;
    //const deleteTodo = await pool.query(`DROP TABLE ${sanitizeIdentifier(tablename)}`);
    const deleteTodo = await pool.query(
      `DROP TABLE ${sanitizeIdentifier(tablename)}`
    );
    res.json(`Table ${tablename} was deleted!`);
  } catch (err) {
    console.log(err.message);
  }
});
function sanitizeIdentifier(identifier) {
  // Implement your own logic to sanitize the identifier if needed.
  // For simplicity, we're just removing any invalid characters here.
  return identifier.replace(/[^a-zA-Z0-9_]/g, "");
}

////////////////////////////////add column##########
app.post("/add-column", async (req, res) => {
  try {
    const { tableName, columnName } = req.body;
    const newColumn = await pool.query(
      `ALTER TABLE ${sanitizeIdentifier(
        tableName
      )} ADD COLUMN ${sanitizeIdentifier(columnName)} text `
    );
    res.send(`New column: ${columnName} created in table: ${tableName}`);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/delete-column", async (req, res) => {
  try {
    const { tableName, columnName } = req.body;
    await pool.query(
      `ALTER TABLE ${sanitizeIdentifier(
        tableName
      )} DROP COLUMN ${sanitizeIdentifier(columnName)} `
    );
    res.send(`Column: ${columnName} deleted from table: ${tableName}`);
  } catch (err) {
    console.error(err.message);
  }
});
