const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const hbs = require("hbs");

const staticpath = path.join(__dirname, "../public");
// const htmlpath = path.join(__dirname, "../public/index.html");
// const projectpath = path.join(__dirname, "../public/projects.html");
// const aboutpath = path.join(__dirname, "../public/about.html");
// const nopath = path.join(__dirname, "../public/404.html");
const template_path = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", template_path);
app.use(express.static(staticpath));
hbs.registerPartials(partialpath);

//this code directly showing the index.html

// app.get("/", (req, res) => {
//   fs.readFile(htmlpath, "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//       res.status(500).render("index.hbs");
//     } else {
//       res.send(data);
//     }
//   });
// });

//but this one showing the index.hbs
app.get("/", (req, res) => {
  res.render("index.hbs");
});

app.get("/about", (req, res) => {
  res.render("about.hbs");
});

app.get("/weather", (req, res) => {
  res.status(200).render("weather.hbs");
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs");
});

app.get("*", (req, res) => {
  // fs.readFile(nopath, "utf8", (err, data) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(500).render("Internal Server Error");
  //   } else {

  //   }
  // });
  res.status(404).render("404.hbs", { errorMsg: "ooops! page not found" });
});

const PORT = 3000;
const IP = "127.0.0.1";
app.listen(PORT, IP, () => {
  console.log(`Server running at http://${IP}:${PORT}/`);
});
