const { createHmac, randomBytes } = require("crypto");
const mongoose = require("mongoose");
const {createTokenforUser}=require('../services/authentication')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "./public/images/default.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// Middleware to hash password before saving
UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = randomBytes(16).toString("hex"); // specify encoding
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  user.salt = salt;
  user.password = hashedPassword;
  next();
});


UserSchema.static("matchPasswordandGenerateToken", async function (email, password) {
  const user = await this.findOne({ email }); 
  if (!user) {
    console.log("user not found");
    throw new Error("USER NOT FOUND");
  }

  const { salt, password: hashedPassword } = user;

  const userProvidedHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedPassword !== userProvidedHash) {
    console.log("Incorrect password");
    throw new Error("Incorrect username or password");
  }

  //return { ...user.toObject(), password: undefined, salt: undefined };
  const token=createTokenforUser(user);
  return token;
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
