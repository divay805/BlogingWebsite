//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { lowerCase, kebabCase, truncate} = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const posts = [];


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




//Home Route
app.get("/",function(req,res) {


  res.render("home",{textIt:homeStartingContent,blogPosts:posts})

  })

// Home Page 
app.get("/home",function(req,res) {

  res.render("home",{textIt:homeStartingContent ,blogPosts:posts})

  })

  // About Page 
  app.get("/about",function(req,res) {

    res.render("about",{aboutText:aboutContent})
  
    })


// Contact Page 
  app.get("/contact",function(req,res){
res.render("contact",{contactText:contactContent})
  })

  //Compose Page
  app.get("/compose",function(req,res){
    res.render("compose",{contactText:contactContent})
      })

      
// Publish fun.
app.post("/compose",function(req,res){

const post = {
  title: req.body.postTitle,
  body: req.body.postBody,
  hrefLink: kebabCase(lowerCase(req.body.postTitle)),
  truncatedText: truncate(req.body.postBody ,{'length':100,'omission':"..."}),
}
// console.log(post.title);
// console.log(post.body);
posts.push(post);
console.log(posts);
res.redirect("/");

})
app.get("/posts/:post",function(req,res){

const postParam = req.params.post; // single post name 
console.log(postParam);

for (let i = 0; i < posts.length; i++) {
  // conversion of the title 
  const kebabTitle = kebabCase(lowerCase(posts[i].title ));
  console.log(kebabTitle);
 
  // check of title with the postParam 
 if(kebabTitle== postParam){
  res.render("post",{postHeading:posts[i].title , postContent:posts[i].body})

 }
}

})

console.log(lowerCase("--Foob ar--"));










// let postobj={
//   postTitle:req.body.posttitle,
//   postBody:req.body.postbody,
// }
// // console.log(postobj);
// console.log(postobj.postBody)


// Listen
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
