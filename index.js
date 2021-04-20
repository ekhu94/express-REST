const express = require("express");
const app = express();
const methodOverride = require("method-override");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.listen(3000, () => {
  console.log("Listening on Port 3000");
});

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

const comments = [
  {
    id: uuidv4(),
    username: "K-LAWN",
    content: "hmm.....that's weird....",
  },
  {
    id: uuidv4(),
    username: "JasperDav",
    content: "I'm pumped up y'all!",
  },
  {
    id: uuidv4(),
    username: "radiantcheese",
    content: "I wouldn't change anything about me...because I'm perfect.",
  },
  {
    id: uuidv4(),
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

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  if (comment) {
    res.render("comments/show", { title: comment.id, comment });
  }
});

app.post("/comments", (req, res) => {
  const { username, content } = req.body;
  comments.push({ id: uuidv4(), username, content });
  res.redirect("/comments");
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { title: "Edit Comment", comment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = req.body.content;
  const findComment = comments.find((c) => c.id === id);
  findComment.content = newComment;
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
