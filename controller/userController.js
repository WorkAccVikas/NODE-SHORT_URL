const userModel = require("../model/users");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");
const { setUser1 } = require("../service/auth1");

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
  // POINT : Stateful Authentication
  // const sessionId = uuidv4();
  // setUser(sessionId, user);
  // res.cookie("uid", sessionId);

  // POINT : Stateless Authentication
  const token = await setUser1(user);
  res.cookie("uid", token);

  return res.redirect("/");
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
