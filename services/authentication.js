const jwt = require("jsonwebtoken");
const secret = "abj@72";

function createTokenforUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImage: user.profileImage,
    role: user.role,
  };

  const token = jwt.sign(payload, secret);
  return token;
}

function validateToken(token) {
  if (!token) {
    console.log('no token found');
    return null;
  }

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Token Verification failed:", error.message);
    return null;
  }
}

//jwt.verify is a method provided by the jsonwebtoken library (a popular library for working with JWTs in Node.js). It takes two arguments:
//token: The JWT string that needs to be verified.
//secret: The secret key used to sign the token. This key is crucial because only tokens signed with this exact key will be verified successfully.
//If the token is valid and correctly signed, jwt.verify returns the decoded payload (often including user information, roles, etc.), and validateToken returns this payload.



module.exports = {
  createTokenforUser,
  validateToken,
};

// we are using these both sevices just to create a JWT token these functions are accessed by controllers
