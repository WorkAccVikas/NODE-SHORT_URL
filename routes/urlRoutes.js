const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controller/urlController");
const router = express.Router();

router.route("/").post(handleGenerateNewShortURL);

router.route("/analytic/:shortId").get(handleGetAnalytics);

module.exports = router;
