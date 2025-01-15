const express = require("express");
const bcrypt = require('bcryptjs');
const { signupValidation, encryptPassword } = require("../utils/authValidate");
const User = require("../models/user");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    signupValidation(req);
    let hashedPassword = await encryptPassword(req.body?.password);
    console.log({ ...req.body, password: hashedPassword });
    const newUser = new User({ ...req.body, password: hashedPassword });

    await newUser.save();
    res.send("user added to db succesfully ");
  } catch (err) {
    res.send("Error while adding user to db " + err.message);
  }
});

router.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const dbUser = await User.findOne({ emailId: emailId });
    if (!dbUser) {
      return res.send("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, dbUser.password);
    if (!isPasswordValid) {
      return res.send("Invalid credentials");
    }
    const token = await dbUser.getJwtToken();
    res.cookie("token", token);
    res.send("Login sucessfully !!");
  } catch (err) {
    res.send("Error: ", err.message);
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("logout successfully");
});

module.exports = router;
