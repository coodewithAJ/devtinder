const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { connectToDB } = require("./config/dbConnection");
const { adminAuth, userAuth } = require("./middlewares/auth");
const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const connectionRequestRouter = require("./router/request");
const userRouter =  require("./router/user")
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/request", connectionRequestRouter);
app.use("/user",userRouter)

connectToDB()
  .then(() => {
    console.log("✅ Connected to the database successfully...");
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    });
  })
  .catch((err) => {
    console.error("❌ Error while connecting to the database:", err.message);
    console.log(err);
  });
