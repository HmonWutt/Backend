const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const bcrypt = require("bcrypt");

//middleware

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("Server has started on port 3000");
});

///////////////////////////////authenticate//////////////////////////////////
const saltrounds = 10;

app.post("/users", async (req, res) => {
  try {
    const name = await req.body.name;
    const password = await bcrypt.hash(req.body.password, saltrounds);

    const userList = await pool.query(
      "insert into users  (name, password) values ($1, $2) RETURNING *",
      [name, password]
    );
    res.json(userList.rows[0]);
    //console.log(res.json(userList.rows[0]));
    //res.status(201).send("User created successfully!");
  } catch (err) {
    console.error(err.message);
  }
});
app.post("/createuser", async (req, res) => {
  let username;
  let password;

  try {
    username = await req.body.username;
    password = await req.body.password;
    const usernames = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (usernames.rows.length > 0) {
      res.json({ message: "Username already exists." });
    } else {
      try {
        const hashedpassword = await bcrypt.hash(password, saltrounds);

        const result = await pool.query(
          `INSERT INTO users(username,password) VALUES ($1,$2) `,
          [username, hashedpassword]
        );
        res.json({ message: "User created successfully!" });
      } catch (error) {
        console.error(error.message);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/addidentifier/:username", async (req, res) => {
  try {
    const { identifier } = req.body;
    const existingIdentifiers = await pool.query(
      "SELECT * FROM users where identifier = $1",
      [identifier]
    );
    if (existingIdentifiers.rows.length > 0) {
      res.json({ message: "Hymph! Not unique enough." });
    } else {
      try {
        const { username } = req.params;
        await pool.query(
          `Update users SET identifier = $1 WHERE username = $2`,
          [identifier, username]
        );
        res.status(200).json({ identifier: identifier });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "error" });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const username = await req.body.username;
    const password = await req.body.password;
    const usernames = await pool.query("SELECT username FROM users");

    if (usernames.rows.some((obj) => obj.username === username)) {
      try {
        const result = await pool.query(
          "SELECT password,identifier FROM users where username=$1",
          [username]
        );

        const retrievedPassword = await result.rows[0].password;
        const identifier = await result.rows[0].identifier;
        console.log("identifier", identifier);
        if (await bcrypt.compare(password, retrievedPassword)) {
          console.log("login successful");

          res.status(200).json({ message: "success", identifier: identifier });
        } else {
          res.status(404).json({message:"Login failed!"});
        }
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "error" });
      }
    } else {
      res.status(404).json({ message: "error" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "error" });
  }
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

/////////////////////////////add new task//////////////////////

app.post("/todo", async (req, res) => {
  try {
    const firstcolumn = "hmon_count = 0";
    const secondcolumn = "joakim_count = 0";
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description, hmon_count, joakim_count) VALUES ($1,$2,$3) RETURNING *",
      [description, 0, 0]
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

app.post("/todo/bedsheet", async (req, res) => {
  res.send("hello");
  console.log("post");
  Getlastdone();
});

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

async function Getlastdone() {
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
          await fetch(`http://192.168.0.6:3000/todo/115`, {
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

app.get("/todo/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;
    const specific_todo = await pool.query(
      "SELECT * FROM todo WHERE identifier = $1 ",
      [identifier]
    );
    res.json(specific_todo.rows[0]);
  } catch (error) {
    res.json({message:"Not found!"})
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
/////////////////////////////////////create table/////////////////////

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

app.get("/descriptions", async (req, res) => {
  try {
    const specific_todo = await pool.query(
      "SELECT description,todo_id FROM todo "
    );
    res.json(specific_todo.rows);
    console.log(specific_todo.rows);
  } catch (error) {
    console.error(error.message);
  }
});

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
