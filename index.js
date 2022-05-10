const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json()); // => allows us to access the req.body

app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

//ROUTES//

//login route

app.use("/auth", require("./jwtAuth"));

//dashboard route
app.use("/dashboard", require("./dashboard"));

//create an employee

app.post("/employees", async (req, res) => {
  try {
    const { firstName, lastName, birthDate, afm } = req.body;

    const newEmployee = await pool.query(
      "INSERT INTO employees (firstName, lastName, birthDate, afm) VALUES($1, $2, $3, $4) RETURNING *",
      [firstName, lastName, birthDate, afm]
    );
    res.json(newEmployee.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//GET ALL
app.get("/employees", async (req, res) => {
  try {
    const { afm } = req.query;
    const { page } = req.query;
    const limit = 5;

    if (afm === undefined) {
      const countEmpl = await pool.query("SELECT COUNT(*) FROM employees");
      const startIndex = (page - 1) * limit;
      const allEmployees = await pool.query(
        "SELECT * FROM employees ORDER BY id OFFSET $1 LIMIT $2",
        [startIndex, limit]
      );

      const employeesElements = {
        totalEmployees: countEmpl.rows[0].count / 1,
        employees: allEmployees.rows,
        countPages: countEmpl.rows[0].count / limit,
        pageNumber: page / 1,
      };
      res.json(employeesElements);
    } else {
      const checkEmployee = await pool.query(
        "SELECT * FROM employees WHERE afm=$1",
        [afm]
      );
      if (checkEmployee.rows[0] == undefined) {
        res.json("Empty");
      } else {
        res.json(checkEmployee.rows[0]);
      }
    }
  } catch (err) {
    console.log(err.message);
  }
});
//get an employee

app.get("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await pool.query("SELECT * FROM employees WHERE id = $1", [
      id,
    ]);
    res.json(employee.rows[0]);
  } catch (err) {
    console.error(null);
  }
});

//update an employee

app.put("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, birthDate, afm } = req.body;

    const updateEmployee = await pool.query(
      "UPDATE employees SET firstName=$1, lastName=$2, birthDate=$3, afm=$4 WHERE id = $5",
      [firstName, lastName, birthDate, afm, id]
    );
    res.json(updateEmployee.rows[0]);
  } catch (err) {
    console.error(null);
  }
});

//delete an employee

app.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEmployee = await pool.query(
      "DELETE FROM employees WHERE id=$1",
      [id]
    );
    res.json(deleteEmployee.rows[0]);
  } catch (err) {
    console.error(null);
  }
});

//start server on PORT
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

//client errors sent on server
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});
