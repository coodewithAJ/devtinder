const express = require("express");
const bcrypt = require("bcryptjs");
const { signupValidation, encryptPassword } = require("../utils/authValidate");
const User = require("../models/user");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    signupValidation(req);
    let hashedPassword = await encryptPassword(req.body?.password);
    const newUser = new User({ ...req.body, password: hashedPassword });
    const savedUser = await newUser.save();
    const token = await savedUser.getJwtToken();
    res.cookie("token", token);
    res.status(200).send({message:"user added to db succesfully ",data:savedUser});
  } catch (err) {
    res.status(500).send(err.message);
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
      return res.status(401).send("Invalid credentials");
    }
    const token = await dbUser.getJwtToken();
    res.cookie("token", token);
    res.status(200).send({ user: dbUser });
  } catch (err) {
    res.status(500).send({ "Error: ": err.message });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("logout successfully");
});

module.exports = router;
