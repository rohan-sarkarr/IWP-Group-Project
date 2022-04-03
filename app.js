//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var _ = require("lodash");
const team_members_frontend = [
  ["Tamanna Kapoor", "19BCE10011", "Frontend"],
  ["Jahnvi Khandelwal", "19BCE10055", "Frontend"],
  ["Khushii Guptaa", "19BCE10339", "Frontend"],
];

const team_members_backend = [
  ["Rohan De Sarkar", "19BCE10067", "Backend"],
  ["Yash Santani", "19BCE10069", "Backend"],
];

const contactContent = "";
const imagelink = "https://thebookofoi.files.wordpress.com/2018/03/how-blogging-works.jpg"
var whole_content = [];
// var team_members = [];
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("partials"));
// mongoose.connect(
//   "mongodb+srv://yash:loveme23@blogdb.nfpnk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//   }
// );
mongoose.connect(
  "mongodb+srv://rohan-sarkar:love123@cluster0.cl30o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);
const contentschema = {
  Title: String,
  Body: String,
};
const Content = mongoose.model("Content", contentschema);

app.get("/", function (req, res) {
  Content.find({}, function (err, contents) {
    res.render("home", {
      whole_content: contents,
      image: imagelink,
    });
  });
  // res.render("home", {
  //   content: homeStartingContent,
  //   whole_content: whole_content,
  // });
});

app.get("/contact", function (req, res) {
  res.render("contact", { content: contactContent });
});

app.get("/about", function (req, res) {
  res.render("about", {
    team_members_frontend: team_members_frontend,
    team_members_backend: team_members_backend,
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/posts/:post", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.post);
  Content.find({}, function (err, contents) {
    contents.forEach(function (post) {
      const storedTitle = _.lowerCase(post.Title);
      if (storedTitle === requestedTitle) {
        res.render("post", { title: post.Title, body: post.Body });
      }
    });
  });
  // whole_content.forEach(function (post) {
  //   const storedTitle = _.lowerCase(post.Title);
  //   if (storedTitle === requestedTitle) {
  //     res.render("post", { title: post.Title, body: post.Body });
  //   }
  // });
});

app.post("/compose", function (req, res) {
  const post = new Content({
    Title: req.body.posttitle,
    Body: req.body.post_content,
  });
  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
  // const post = {
  //   Title: req.body.posttitle,
  //   Body: req.body.post_content,
  // };
  //whole_content.push(post);
  // res.redirect("/");
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("server started successfully");
});
