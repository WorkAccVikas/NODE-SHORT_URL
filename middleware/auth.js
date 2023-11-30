const { getUser1 } = require("../service/auth1");

async function checkAuth(req, res, next) {
  // const userUid = req.cookies?.uid;
  // POINT : Check token in header for client (e.g mobile)
  console.log("Header = ", req.headers);
  const userUid = req.headers?.["authorization"];
  const token = userUid.split("Bearer ")[1];

  // POINT : Stateful Authentication
  // const user = getUser(userUid);
  // POINT : Stateless Authentication
  // const user = await getUser1(userUid);
  // POINT : For mobile
  const user = await getUser1(token);

  req.user = user;

  next();
}

async function restrictToLoggedInUserOnly(req, res, next) {
  // const userUid = req.cookies?.uid;
  // POINT : Check token in header for client (e.g mobile)
  console.log("Header = ", req.headers);
  const userUid = req.headers?.["authorization"];
  const token = userUid.split("Bearer ")[1];

  if (!userUid) return res.redirect("/login");

  // POINT : Stateful Authentication
  // const user = getUser(userUid);
  // POINT : Stateless Authentication
  // const user = await getUser1(userUid);
  // POINT : For mobile
  const user = await getUser1(token);

  if (!user) return res.redirect("/login");

  req.user = user;

  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
  checkAuth,
};
