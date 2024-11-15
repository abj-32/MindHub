const express=require('express')
const {handleUserSignup,handleUserSignIn} =require('../controllers/user')
const userRouter=express.Router();

userRouter.get("/signin",(req,res)=>{
    res.render("signin");
})


userRouter.get("/signup",(req,res)=>{
    res.render("signup");
});

userRouter.post("/signin",handleUserSignIn)

userRouter.post("/signup",handleUserSignup);

userRouter.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/");
})

module.exports=userRouter