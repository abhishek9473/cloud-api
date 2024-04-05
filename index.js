require('dotenv').config();
const cors = require("cors");
const express = require("express");

const app = express();
const server = require("http").createServer(app);
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const port = process.env.PORT || 3000;

// mongo db connection
require("./connection.js");

// // ---> this is api homepage <--- // //
app.use("/", require("./api/index.js"));

// 404 route
app.use("*", (req, res) => {
  res.send({
    status: false,
    message: "Path not find",
  });
});

server.listen(port, () => {
  console.log(`App is running on : http://localhost:${port}`);
});
