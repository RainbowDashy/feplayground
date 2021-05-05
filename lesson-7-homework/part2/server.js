const express = require("express");
const path = require("path");
const app = express();
const port = 3333;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/max-age", (req, res) => {
  const period = 60 * 5;
  res.set("Cache-control", `public, max-age=${period}`);
  res.send("max-age");
});

app.get("/no-cache", (req, res) => {
  res.set("Cache-control", `no-cache`);
  res.send("no-cache");
});

app.get("/no-store", (req, res) => {
  res.set("Cache-control", `no-store`);
  res.send("no-store");
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
