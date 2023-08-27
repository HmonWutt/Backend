/////all the todo routes////
const routertodo = require("express").Router();
const pool = require("../db");
const verify = require("./verifytoken");

routertodo.get("/", async (req, res) => {
  try {
    const allTodos = await pool.query(
      "SELECT * FROM todo ORDER BY todo_id ASC"
    );
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});
routertodo.get("/id/:id/:identifier", async (req, res) => {
  try {
    const { id, identifier } = req.params;
    console.log(id);
    const specific_todo = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1 and identifier = $2 ORDER BY todo_id ASC",
      [id, identifier]
    );
    res.json(specific_todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

routertodo.get("/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;
    console.log("identifier", identifier);
    const specific_todo = await pool.query(
      "SELECT * FROM todo WHERE identifier = $1 ORDER BY todo_id DESC",
      [identifier]
    );
    res.json(specific_todo.rows);
  } catch (error) {
    res.json({ message: "Not found!" });
    console.error(error.message);
  }
});
routertodo.get(
  "/descriptionlist/descriptions/:identifier",
  async (req, res) => {
    try {
      const { identifier } = req.params;
      const specific_todo = await pool.query(
        "SELECT description,todo_id FROM todo WHERE identifier=$1 ",
        [identifier]
      );
      res.json(specific_todo.rows);
      console.log("descriptions", specific_todo.rows);
    } catch (error) {
      console.error(error.message);
    }
  }
);

routertodo.get("/bedsheet", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todo WHERE todo_id = 115");
    const lastdone = result.rows[0].lastdone;
    res.json(lastdone);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
/////////////////////////////add new task//////////////////////

routertodo.post("/:identifier", async (req, res) => {
  try {
    const { description, name1, name2 } = req.body;
    console.log(req.body);
    const { identifier } = req.params;
    const count = 0;
    const newTodo = await pool.query(
      "INSERT INTO todo (description,identifier,name1,name2,name1_count,name2_count) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [description, identifier, name1, name2, count, count]
    );
    res
      .status(200)
      .json({ message: "success", description: newTodo.rows[0].description });
  } catch (err) {
    console.error(err.message);
    res.json({ message: "error" });
  }
});

routertodo.post("/bedsheet", async (req, res) => {
  res.send("hello");
  console.log("post");
  Getlastdone();
});

//////////////////////////////////////////////////////////////////////////////////////////

// routertodo.put("/id/:id/:identifier", async (req, res) => {
//   console.log("this was called");
//   try {
//     const { id, identifier } = req.params;
//     const { set } = req.body;
//     console.log(set);

//     const updateTOdo = await pool.query(
//       `UPDATE todo ${set}  WHERE todo_id = $1 and identifier=$2`,
//       [id, identifier]
//     );
//     console.log(updateTOdo);
//     res.json(`To do id:${id} of set:${set} was updated`);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

routertodo.put("/:identifier/:id", async (req, res) => {
  try {
    const { identifier, id } = req.params;
    const { description } = req.body;
    console.log(description);
    const updateTOdo = await pool.query(
      "UPDATE todo SET description = $1  WHERE identifier = $2 and todo_id = $3 returning description",
      [description, identifier, id]
    );
    console.log(updateTOdo);
    res.json({ message: description });
  } catch (error) {
    console.error(error.message);
    res.json({ message: "error.message" });
  }
});
/////////////////////////////////////////////////////////////////////////////////////////////////

routertodo.delete("/:identifier/:id", async (req, res) => {
  try {
    const { identifier, id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE identifier= $1 and todo_id = $2",
      [identifier, id]
    );
    res.json(`Todo ${id} was deleted!`);
  } catch (err) {
    console.log(err.message);
    res.json({ message: err.message });
  }
});

module.exports = routertodo;
