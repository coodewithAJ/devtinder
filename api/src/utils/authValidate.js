const bcrypt = require('bcryptjs');
const validator = require("validator");
const encryptPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const signupValidation = (req) => {
  const { password } = req.body;
  if (!password) {
    throw new Error("password can't be empty");
  }
  if (password.length < 8 || password.length > 50) {
    throw new Error("password length should be in between 8 to 50");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("create a strong password");
  }
};

module.exports = { encryptPassword, signupValidation };
