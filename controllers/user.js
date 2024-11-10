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

    try{
        const token= await User.matchPasswordandGenerateToken(email,password);
    //console.log('token',token);
    return res.cookie('token',token).redirect("/")
    }
    catch(error){
        return res.render("signin",{
            error:"Incorrect email or password",
        })
    }
    
}
module.exports={
    handleUserSignup,handleUserSignIn
}