// POINT : Stateless Authentication
const jwt = require("jsonwebtoken");

function setUser1(user) {
  console.log("setUser1 = ", user);
  return jwt.sign(user.toJSON(), process.env.SECRET_KEY);
}

function getUser1(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = {
  setUser1,
  getUser1,
};
