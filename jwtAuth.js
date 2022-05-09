const express = require("express");
const router = express.Router();
const pool = require("./db");
const jwtGenerator = require("./jwtGenerator");
const validation = require("./validation");
const authorization = require("./authorization");

//login route
router.post("/login", validation, async (req, res) => {
  try {
    //1. destructure the body

    const { email, password } = req.body;

    //2. check if user doesn't exist (if not then we throw an error)
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    //3. check if incoming password is the same database password

    if (password !== user.rows[0].password) {
      return res.status(401).json("Λάθος email ή κωδικός!");
    }

    //4. give them the jwt token

    const token = jwtGenerator(user.rows[0].id);

    res.json({ token });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
