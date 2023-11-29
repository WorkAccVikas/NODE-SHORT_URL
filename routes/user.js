const express = require("express");
const {
  handleUserSignUp,
  handleUserLogin,
} = require("../controller/userController");
const router = express.Router();

router.route("/").post(handleUserSignUp);
router.route("/login").post(handleUserLogin);

module.exports = router;
