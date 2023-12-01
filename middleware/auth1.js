// TOPIC : Authorization
const { getUser1 } = require("../service/auth1");

// POINT : FOR AUTHENTICATION (Soft Check)
function checkForAuthentication(req, res, next) {
  console.log("Authentication running....");
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser1(token);

  req.user = user;
  return next();
}

// POINT : FOR AUTHORIZATION (Strict Check)
function restrictTo(roles = []) {
  console.log(roles);
  return function (req, res, next) {
    console.log("Authorization running....");
    // console.log(req.user?.role);
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.end("Unauthorized");

    return next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
