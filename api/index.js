const express = require("express");
const { addUser } = require("../controllers/signupController");
const { loginUser } = require("../controllers/loginController");
const { auth } = require("../middleware/auth");
const addFolderController = require("../controllers/addFolderController");
const addItemController = require("../controllers/addItemController");
const viewAllItemController = require("../controllers/viewAllItemController");
const app = express.Router();

// //              |-----------------------------------------------|
// //   ######---->|     All router start from "/" (home) here     |<----######
// //              |-----------------------------------------------|

// // https://localhost:3000/...

app.get("/", (req, res) => {
  res.send("hello this is API homepage , welcome");
});

// // add user in databse and login from database
app.post("/register", addUser);
app.post("/login", loginUser);

app.post("/add_folder", auth, addFolderController);
app.post("/add_file", auth, addItemController);

app.get("/all_file", auth, viewAllItemController);




module.exports = app;
