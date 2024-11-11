const cookieParser = require('cookie-parser')
const {validateToken}=require("../services/authentication")
function checkForAuthentication(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue=req.cookies[cookieName];

        if(!tokenCookieValue){
            return next();
        }

        try {
            const userPayload=validateToken(tokenCookieValue);
            req.user=userPayload// a user is being inserted here so of any ones get logged in any request it further does browser sends this user to us also no matter on which route he is requesting
            return next();
        } catch (error) {
            
        }

        return next();

    }

}

module.exports={
    checkForAuthentication,
}

//checkForAuthentication checks for a specific cookie (cookieName) containing an authentication token.
//If the token exists and is valid, it attaches the user information to req.user.
//If the token is missing or invalid, it simply moves to the next middleware or route handler without attaching user info.