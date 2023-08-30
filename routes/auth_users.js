/////all the users toutes//////
const routerusers = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltrounds = 10;
const verify = require("./verifytoken");
const { secret } = require("./secret");

function getaccesstoken() {
  let result;
  routerusers.get("/access", verify, async (req, res) => {
    try {
      const accesstoken = jwt.sign({ _id: { username } }, secret, {
        expiresIn: 60,
      });
      result = accesstoken;
    } catch (error) {
      result = error;
    }
  });
  return result;
}

routerusers.post("/access", async (req, res) => {
  const username = await req.body.username;
  try {
    const accesstoken = jwt.sign({ _id: { username } }, secret, {
      expiresIn: 60,
    });
    res.json({ accesstoken: accesstoken });
  } catch (error) {
    res.json({ error: error });
  }
});

routerusers.post("/refresh", verify, async (req, res) => {
  const username = await req.body.username;
  try {
    const refreshtoken = jwt.sign({ _id: { username } }, secret, {
      expiresIn: "1h",
    });
    res.json({ refreshtoken: refreshtoken });
  } catch (error) {
    res.json({ error: error.message });
  }
});

routerusers.post("/", async (req, res) => {
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

routerusers.post("/createuser", async (req, res) => {
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
          `INSERT INTO users(username,password) VALUES ($1,$2) returning username`,
          [username, hashedpassword]
        );

        res.json({
          message: "User created successfully!",
          username: result.rows[0].username,
        });
        console.log(`New user ${username} registered`);
      } catch (error) {
        console.log(error.message);
        res.json({ message: "error" });
      }
    }
  } catch (error) {
    console.error(error.message);
    res.json({ message: "error" });
  }
});

routerusers.post("/login", async (req, res) => {
  try {
    const username = await req.body.username;
    const password = await req.body.password;
    const usernames = await pool.query(
      "SELECT * FROM users where username=$1",
      [username]
    );

    //if (usernames.rows.some((obj) => obj.username === username)) {
    if (usernames.rows.length > 0) {
      try {
        const result = await pool.query(
          "SELECT password,identifier,name1,name2 FROM users where username=$1",
          [username]
        );

        const retrievedPassword = await result.rows[0].password;
        const identifier = await result.rows[0].identifier;
        const name1 = await result.rows[0].name1;
        const name2 = await result.rows[0].name2;
        console.log("identifier", identifier);
        console.log(result.rows[0]);
        if (await bcrypt.compare(password, retrievedPassword)) {
          console.log("login successful");
          const token = jwt.sign({ _id: { username } }, secret);
          //res.header("auth-token", token);
          res.cookie("authToken", token, {
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
            httpOnly: true,
          });
          res.status(200).json({
            message: "success",
            identifier: identifier,
            name1: name1,
            name2: name2,
          });
        } else {
          res.status(404).json({ message: "Login failed!" });
        }
      } catch (error) {
        console.error(error.message);
        res.status(404).json({ message: error.message });
      }
    } else {
      res.status(404).json({ message: "error" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "error" });
  }
});

routerusers.get("/autologin", async (req, res) => {
  const cookie = req.headers.cookie;
  if (!cookie || cookie === null) {
    console.log("cookie not found");
    res.status(401).json({ message: "Cooike not found" });
  }
  console.log("cookie not found");

  try {
    console.log("cooike", typeof cookie);
    const decoded = cookie && atob(cookie.split(".")[1]);
    const parsed = JSON.parse(decoded);
    const username = parsed._id.username;
    const result = await pool.query(
      "SELECT identifier,name1,name2 FROM users where username=$1",
      [username]
    );
    const identifier = await result.rows[0].identifier;
    const name1 = await result.rows[0].name1;
    const name2 = await result.rows[0].name2;
    console.log("identifier", identifier);
    console.log(result.rows[0]);
    res.status(200).json({
      message: "success",
      identifier: identifier,
      username: username,
      name1: name1,
      name2: name2,
    });
  } catch (error) {
    console.log(error.message);
  }
});

routerusers.get("/logout", async (req, res) => {
  res.clearCookie("authToken");
  res.status(200).json({ message: "success" });
});

routerusers.post("/addidentifier/:username", async (req, res) => {
  const username = req.params.username;
  const identifier = req.body.identifier;
  const identifiers = await pool.query(
    "SELECT * FROM users where identifier=$1",
    [identifier]
  );
  identifiers && console.log(identifiers);
  if (identifiers.rows.length > 0) {
    res.json({ message: "Name taken. Please choose another name." });
  } else {
    try {
      console.log("addidentifier called");

      const result = await pool.query(
        "UPDATE users SET identifier = $1 WHERE username = $2 returning username, identifier",
        [identifier, username]
      );
      console.log(`'${identifier}'`, `'${username}'`);
      console.log("addidentifier", result.rows[0]);
      const user = result.rows[0];
      res.status(200).json({
        message: "success",
        username: user.username,
        identifier: user.identifier,
      });
    } catch (error) {
      console.error(error.message);
      res.json({ message: error.message });
    }
  }
});

routerusers.post("/addnames/:identifier", async (req, res) => {
  const identifier = req.params.identifier;
  const { name1, name2 } = req.body;
  console.log(name1, name2, identifier);
  try {
    const result = await pool.query(
      "UPDATE users SET name1 = $1, name2=$2 WHERE identifier = $3 returning name1,name2 ",
      [name1, name2, identifier]
    );

    console.log("addnames", result.rows);
    const user = result.rows;
    res.json({
      message: "success",
      name1: user[0],
      name2: user[1],
    });
  } catch (error) {
    console.error(error.message);
    res.json({ message: "failed" });
  }
});
module.exports = routerusers;
