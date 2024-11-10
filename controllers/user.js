const User=require('../models/user');
const mongoose=require('mongoose')

async function handleUserSignup(req,res){
    const {name, email,password}=req.body;

    await User.create({
        name,
        email,
        password
    });
     return res.redirect("/");
}


async function handleUserSignIn(req,res) {
    const {email,password}=req.body;
    const user= await User.matchPassword(email,password);
    console.log('User',user);

    return res.redirect("/")
}
module.exports={
    handleUserSignup,handleUserSignIn
}