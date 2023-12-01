const express = require("express");
const router = express.Router();
const urlModel = require("../model/urlModel");
const { restrictTo } = require("../middleware/auth1");

router.route("/admin/urls").get(restrictTo(["ADMIN"]), async (req, res) => {
  console.log("Admin HOME");
  const allURL = await urlModel.find({}).populate("createdBy");
  console.log(`🚀 ~ file: staticRouter.js:9 ~ router.route ~ allURL:`, allURL);
  return res.render("home1", {
    urls: allURL,
    role: "ADMIN",
  });
});

router.route("/").get(restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  console.log("HOME");
  // if (!req.user) return res.redirect("/login");
  const allURL = await urlModel.find({ createdBy: req.user._id });
  return res.render("home1", {
    urls: allURL,
  });
});

router.route("/signup").get((req, res) => {
  return res.render("signup");
});

router.route("/login").get((req, res) => {
  console.log("Ram = ", req.user);
  return res.render("login");
});

module.exports = router;
