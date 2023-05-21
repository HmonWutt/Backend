const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware

app.use(cors());
app.use(express.json());


app.listen(3000,() => {
  console.log("Server has started on port 3000");
});

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

app.get("/todo", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const specific_todo = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1",
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
    const { description } = req.body;
    const updateTOdo = await pool.query(
      "UPDATE todo SET description =$1 WHERE todo_id = $2",
      [description, id]
    );
    res.json(`To do id:${id} was updated`);
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
