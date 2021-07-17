const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const { handleRegister } = require("./Navigators/Register");

const Register = require("./Navigators/Register");
const Signin = require("./Navigators/Signin");
const Profile = require("./Navigators/Profile");
const Image = require("./Navigators/Image");

const port = process.env.PORT || 3000;

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

// DB
//   .select("*")
//   .from("users")
//   .then((data) => {
//     console.log(data);
//   });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("dataBase.users");
});

app.post("/signin", (req, res) => {
  Signin.SigninHandler(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  Register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  Profile.ProfileHandler(req, res, db);
});

app.put("/image", (req, res) => {
  Image.ImageHandler(req, res, db);
});

app.post("/imageurl", (req, res) => {
  Image.handleAPI(req, res);
});

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

// console.log(PORT);

/*
/-->res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userid --> GET = user
/image --> PUT -->user
*/
