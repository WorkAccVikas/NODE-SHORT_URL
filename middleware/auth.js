const { getUser } = require("../service/auth");
const { getUser1 } = require("../service/auth1");

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  // POINT : Stateful Authentication
  // const user = getUser(userUid);
  // POINT : Stateless Authentication
  const user = await getUser1(userUid);

  req.user = user;

  next();
}

async function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) return res.redirect("/login");

  // POINT : Stateful Authentication
  // const user = getUser(userUid);
  // POINT : Stateless Authentication
  const user = await getUser1(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;

  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
  checkAuth,
};
