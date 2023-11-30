const express = require("express");
const router = express.Router();
const urlModel = require("../model/urlModel");

router.route("/").get(async (req, res) => {
  if (!req.user) return res.redirect("/login");
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
