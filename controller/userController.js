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
  /** NOTE : expiry cookie using either expires or maxAge */
  res.cookie("token", token, {
    // * : Correct way to set expires in cookie (pass date object)
    // expires: new Date(Date.now() + 1 * 60 * 1000),
    // ! : Wrong way to set expires in cookie
    // expires: Date.now() + 1 * 60 * 1000,
    maxAge: 1 * 60 * 60 * 1000,
  });

  return res.redirect("/");

  // POINT : For other Frontend other than Browser (e.g mobile)
  // return res.json({ token });
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
