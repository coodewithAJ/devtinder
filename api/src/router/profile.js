const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const router = express.Router();

router.delete("/delete", async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.body._id });
    res.send("user deleted");
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.patch("/update", userAuth, async (req, res) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "skills",
  ];
  try {
    const isEditAllowed = Object.keys(req.body).every((key) =>
      allowedEditFields.includes(key)
    );
    console.log(isEditAllowed);
    if (!isEditAllowed) {
      throw new Error("Edit not allowed");
    }

    req.user = { ...req.user, ...req.body };

    console.log(req.user);
    await User.findOneAndUpdate(
      { emailId: req.user.emailId },
      { ...req.body },
      { runValidators: true }
    );
    res.send({
      message: "user updated",
      data: {
        ...req.user,
      },
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/view", userAuth, async (req, res) => {
  try {
    res.status(200).send({ user: req.user });
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
