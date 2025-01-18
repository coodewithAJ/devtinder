const { JsonWebTokenError } = require("jsonwebtoken");
const mongoose = require("mongoose");
const npmValidator = require("validator");
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 3,
      maxLength: 50,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minLength: 5,
      maxLength: 100,
      unique: true,
      validate(value) {
        if (!npmValidator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 100,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      default: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others", "other"].includes(value)) {
          throw new Error("gener should be either male, female or others");
        }
      },
    },
    skills: [String],
  },
  {
    timestamps: true,
  }
);
userSchema.methods.getJwtToken = async function(){
    const user = this
    const token =  await jwt.sign({ _id: user._id}, "thisismyjwtseckey",{expiresIn:"10d"});
    return token;
}
const User = mongoose.model("User", userSchema);
module.exports = User;
