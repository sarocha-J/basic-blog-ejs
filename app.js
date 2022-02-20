const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Time flies so fast. Looking back, my high school is just like a movie, a lot of things happened. High School is four years of growing up and probably a time in your life where you go through the most changes. In high school you are able to discover yourself and find out who you are as a person. Each year is special and unique in their own way. My journey through high school was a tough one, especially because I decided to not only focus on academic work but also to invest quality time in extra curriculum activities. I wanted more than just academic excellence; I wanted to be a leader, I wanted to add value to every aspect of my life, I wanted a rounded education and not just mere schooling. My success story is what I will like to share with you; how I really made it and how this defines my personality. My journey in High School was scary, exciting, and successful. On the night before the first day of high school, I was the most nervous thirteen year old.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Please check your email (xxx@hotmail.com).";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get('/', function(req, res){
  res.render('home', {startContent: homeStartingContent, posts: posts})
});

app.get('/about', function(req, res){
  res.render('about', {startContent: aboutContent})
});

app.get('/contact', function(req, res){
  res.render('contact', {startContent: contactContent})
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
