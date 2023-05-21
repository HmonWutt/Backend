const Pool = require("pg").Pool;
const pool = new Pool({
  user: "wutthmon",
  host: "localhost",
  port: "5432",
  database: "todolist",
});
module.exports = pool;
