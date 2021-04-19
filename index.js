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
