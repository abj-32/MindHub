const jwt=require('jsonwebtoken');
const { create } = require('../models/user');
const secret='abj@72';

function createTokenforUser(user){
    const payload={
        _id:user._id,
        email:user.email,
        profileImage:user.profileImage,
        role:user.role
    }

    const token=jwt.sign(payload,secret);
    return token;
}

function validateToken(token){
    if(!token) return null;

    try{
        return jwt.verify(token,secret);
    }
    catch(error){
        console.error("Token Verification failed:",error.message);
        return null;
    }

}

module.exports={
    createTokenforUser,validateToken
}