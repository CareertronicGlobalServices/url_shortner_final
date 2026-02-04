const express = require("express");
const { handleUserLogin, handleUserSignUp } = require("../controllers/user");

const router = express.Router();

router
  .route("/signup")
  .get((req, res) => {
    return res.render("SignUp");
  })
  .post(handleUserSignUp);

router
  .route("/login")
  .get((req, res) => {
    return res.render("Login");
  })
  .post(handleUserLogin);

router.get("/logOff", (req, res) => {
  return res.render("LoggedOff");
});
module.exports = router;
