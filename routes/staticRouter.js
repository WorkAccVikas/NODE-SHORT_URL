const express = require("express");
const router = express.Router();
const urlModel = require("../model/urlModel");

router.route("/").get(async (req, res) => {
  const allURL = await urlModel.find({});
  return res.render("home1", {
    urls: allURL,
  });
});
module.exports = router;
