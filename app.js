const express = require("express");
const app = express();
const studentRoute = require("./api/routes/student"); // Basic
const facultyRoute = require("./api/routes/faculty"); // Practice
const userRoute = require("./api/routes/user"); // Main
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://your_username:your_password@cluster0.nc7wo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

mongoose.connection.on("error", (err) => {
  console.log("Connection Failed");
});

mongoose.connection.on("connected", (connected) => {
  console.log("Database Connected");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// For route /student
app.use("/student", studentRoute);
// For route /faculty
app.use("/faculty", facultyRoute);

// Main user route (Signup, signin, etc etc) ...
app.use("/user", userRoute);

app.use((req, res, next) => {
  res.status(404).json({
    error: "Bad request",
  });
});

module.exports = app;

