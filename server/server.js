const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

// express app
const app = express();
const port = 3001;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

// con setting
// const pg = require("pg");
const { Pool } = require("pg");

const pool = new Pool({
  host: "heffalump.db.elephantsql.com",
  user: "cqhojvry",
  password:  ,
  max: 20,
  database: "cqhojvry",
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.connect();

//show all query

app.get("/", (req, res) => {
  pool.query("SELECT * FROM Products", function (err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    const data = JSON.stringify(result.rows);

    res.send(data);
  });
});

//add create query

app.put("/", (req, res) => {
  const { name, description, location, quantity } = req.body;

  pool.query(
    `INSERT INTO products (name, description, location, quantity)
    VALUES ('${name}', '${description}', '${location}', ${quantity});`,
    function (err, result) {
      if (err) {
        return console.error("error running query", err);
      }
    }
  );
  res.status(200).json({ message: "Product has been saved." });
});
//delete query
app.delete("/", (req, res) => {
  const { id } = req.body;
  console.log(id);
  pool.query(
    `DELETE FROM products WHERE product_id=${id};`,
    function (err, result) {
      if (err) {
        return console.error("error running query", err);
      }
    }
  );
  res.status(200).json({ message: "Product has been deleted." });
});

//edit query
app.post("/", (req, res) => {
  const { name, description, location, quantity, id } = req.body;

  pool.query(
    `UPDATE products
    SET name = '${name}', location = '${location}', description = '${description}', quantity = ${quantity}
    WHERE product_id = ${id};`,
    function (err, result) {
      if (err) {
        return console.error("error running query", err);
      }
    }
  );
  res.status(200).json({ message: "Product has been saved." });
});

app.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`);
});
