const express = require("express");
const { getAllURLs } = require("../controllers/url");
const { handleUserLogout } = require("../controllers/user");
const router = express.Router();

router.get("/", (req, res) => {
  return res.render("Login"); //ejs page
});
router.get("/home", getAllURLs);
router.get("/logOff", handleUserLogout);

module.exports = router;
