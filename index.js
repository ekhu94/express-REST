const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Listening on Port 3000");
});

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

const comments = [
  {
    username: "K-LAWN",
    content: "hmm.....that's weird....",
  },
  {
    username: "JasperDav",
    content: "I'm pumped up y'all!",
  },
  {
    username: "radiantcheese",
    content: "I wouldn't change anything about me...because I'm perfect.",
  },
  {
    username: "DDR_BOI",
    content: "do you guys wanna see my DDR shoes?",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments, title: "Comments" });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new", { title: "New Comment" });
});

app.post("/comments", (req, res) => {
  const { username, content } = req.body;
  comments.push({ username, content });
  res.redirect("/comments");
});

//! TACOS EXAMPLE
app.get("/tacos/new", (req, res) => {
  res.render("tacoForm", { title: "Taco Form" });
});

app.get("/tacos", (req, res) => {
  res.send("GET /tacos response");
});

app.post("/tacos", (req, res) => {
  const { meat, qty } = req.body;
  res.send(`Order received! Here's your ${qty} ${meat} tacos.`);
});
