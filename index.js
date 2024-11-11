const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const cookieParser=require('cookie-parser')
const {checkForAuthentication}=require('./middlewares/authentication')

const Blog=require('./models/blog')


const app = express();
const PORT = 8000;




//================mongoDB database connection===========================
connectToMongoDB("mongodb://localhost:27017/blogify").then(() => {
  console.log("Connected to Mongodb");
});

//======================================================================





//==========================middlewares start=============================
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(checkForAuthentication("token"))
 //app.use(express.static('public'));
app.use(express.static( path.resolve('./public')))


//==========================middlewares end===============================





//======Routes==========================================
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");


//======================================================




app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/user", userRouter);
app.use("/blog", blogRouter);



//=====================================HomePage is being rendered from here===========================//
app.get("/", async(req, res) => {
  const allBlogs= await Blog.find({});
  res.render("home",{
    user:req.user,
    blogs:allBlogs
  });
  //console.log(req.user);
});

//=====================================HomePage is being rendered from here=========================//






app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

//cookie-parser is a middleware that simplifies working with cookies in Express. It parses the "Cookie" header in incoming requests and populates req.cookies with an object representing each cookie.
