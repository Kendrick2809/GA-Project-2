require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const eventModel = require("./models/events");

const app = express();
const port = 3000;

const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@generalassembly.qzxpjfv.mongodb.net/test`;

//import the controller
const userController = require("./controllers/users/user_controller");
const pageController = require("./controllers/pages/page_controller");

// Set view engine
app.set("view engine", "ejs");

// Apply middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false },
  })
);

// Page Routes
app.get("/", (req, res) => {
  res.send("I am listening");
});

app.get("/users/admin", pageController.showAdminPage);
app.get("/users/user", pageController.showUserPage);
app.post("/users/admin", pageController.inputEvent);
app.delete("/users/admin", pageController.deleteEvent);
app.get("/users/admin/:event_id", pageController.showEventPage);

app.get("/events/all", async (req, res) => {
  const eventData = await eventModel.find({});
  console.log(eventData);
  res.json(eventData);
});

// Users Routes
app.get("/users/register", userController.showRegistrationForm);
app.post("/users/register", userController.register);
app.get("/users/login", userController.showLoginForm);
app.post("/users/login", userController.login);

app.listen(port, async () => {
  try {
    await mongoose.connect(connStr, { dbName: "GA_Project2" });
    console.log("successfully connect to DB");
  } catch (err) {
    console.log(`Failed to connect to DB`);
    process.exit(1);
  }

  console.log(`Example app listening on port ${port}`);
});
