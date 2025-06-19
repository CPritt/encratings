require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const path = require('path');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'yourSecretKey', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.redirect("/login");
});

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

const homeRouter = require("./routes/home");
app.use("/home", homeRouter);

app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/views/login.html");
});

app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/views/register.html");
});

app.get("/home", function (req, res) {
  res.sendFile(__dirname + "/views/home.html");
});

app.get('/home/add', function (req, res) {
  res.sendFile(__dirname + '/views/add_movie.html')
})


app.listen(3000, () => console.log("Server is running on port 3000"));
