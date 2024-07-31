const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

const connectDatabase = require("./database/DatabaseManager.js");
const accountManager = require("./database/AccountManager.js");
const servicingManager = require("./database/ServicesManager.js");
const feedbackManager = require("./database/FeedbackManager.js");
const ratingManager = require("./database/RatingManager.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("images"));
app.use(express.static("css"));
app.use(express.static("js"));

app.use(
  session({
    secret: "GadgetConnect",
    cookie: {
      secure: false,
      maxAge: null,
    },
    saveUninitialized: false,
    resave: false,
  })
);

app.set("view engine", "ejs");

connectDatabase();

app.get("/", (req, res) => {
  res.render("front", { username: req.session.username });
});

app.get("/admin", (req, res) => {
  res.render("admin");
});

app.get("/admin/login", (req, res) => {
  res.render("admin_login");
});

// ---------- REGISTER ----------

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  await accountManager.DatabaseCreateAccount(req.body, req);
  console.log(req.session.username);
  res.redirect("/");
});

// ---------- LOGIN ----------

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  await accountManager.DatabaseLoginAccount(req.body, req);
  res.redirect("/");
});

// ---------- SERVICING ----------

app.get("/servicing", async (req, res) => {
  if (req.session.username === undefined) {
    res.redirect("/login");
    return;
  }

  const engineer = await servicingManager.DatabaseGetService(
    req.session.username
  );

  res.render("servicing", {
    username: req.session.username,
    engineer: engineer,
  });
});

app.post("/servicing", async (req, res) => {
  await servicingManager.DatabaseAddService(req.session.username, req.body.description);

  res.redirect("/servicing");
});

// ---------- ENGINEERS ----------

app.get("/engineers", async (req, res) => {
  const ratings = await ratingManager.DatabaseGetRatings();
  res.render("engineers", { username: req.session.username, ratings: ratings });
});

// ---------- ABOUT ----------

app.get("/about", (req, res) => {
  res.render("about", { username: req.session.username });
});

// ---------- TESTIMONIALS ----------

app.get("/feedback", async (req, res) => {
  if (req.session.username === undefined) {
    res.redirect("/login");
    return;
  }

  const feedbacks = await feedbackManager.DatabaseGetFeedbacks(
    req.session.username
  );

  res.render("feedback", {
    username: req.session.username,
    feedbacks: feedbacks,
  });
});

app.post("/feedback", async (req, res) => {
  await feedbackManager.DatabaseAddFeedback(
    req.session.username,
    req.body.feedback
  );

  await ratingManager.DatabaseRateEngineer(
    req.body.engineerName,
    req.body.engineerRating
  );

  res.redirect("/feedback");
});

app.listen(7070, () => console.log("ACTIVE"));
