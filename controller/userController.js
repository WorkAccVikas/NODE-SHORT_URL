const userModel = require("../model/users");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;

  await userModel.create({
    name,
    email,
    password,
  });

  return res.render("home1", {
    id: shortID,
  });
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, password });

  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
