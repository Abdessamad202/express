const express = require("express");
const app = express();
const port = 3000;
const link = "http://localhost:" + port;
const mongoose = require("mongoose");
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.set("view engine","ejs")
// app.set("view","view")

const Fillable = require("./model/mydataschma");
app.get("/", (req, res) => {
  Fillable.find().then((result)=>{
    res.render("index",{arr : result})
  })
  // res.render("index",{article:[
  //   {title: "article1"},
  //   {title: "article2"},
  //   {title: "article3"}
  // ]})
  // res.sendFile("./views/index.html", { root: __dirname });
});

mongoose
  .connect(
    "mongodb+srv://kechafabdoka2018:UuMuHQM6NX0kZEw4@cluster0.3k4mw.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((params) => {
    app.listen(port, () => {
      console.log(`Example app listening on link ${link}`);
    });
  })
  .catch((params) => {});

app.post("/all-articles", (req, res) => {
  console.log(req.body);
  Fillable.create(req.body)
    .then((result) => res.redirect("/index.html"))
    .catch((err) => {
      console.log(err);
      // res.redirect("/");
    });
});
app.get("/index.html",(req,res)=>{
  res.send("the data has been sending")
})
// nodemon
// dirname
// sendfile
//
app.get("/home", (req,res) => {
  res.render("index",{root : __dirname})
})
app.get("/add", (req,res) => {
  res.render("user/add")
})
app.get("/edit", (req,res) => {
  res.render("user/edit")
})
app.get("/view", (req,res) => {
  res.render("user/view")
})
app.get("/search", (req,res) => {
  res.render("user/search")
})