const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const cookieParser=require('cookie-parser')
const {checkForAuthentication}=require('./middlewares/authentication')


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

//==========================middlewares end===============================





//======Routes==========================================
const userRouter = require("./routes/user");

//======================================================




app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.render("home",{
    user:req.user
  });
});






app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

//cookie-parser is a middleware that simplifies working with cookies in Express. It parses the "Cookie" header in incoming requests and populates req.cookies with an object representing each cookie.
