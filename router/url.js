const express = require("express");
const router = express.Router();
const {
  handleGenerateShortUrl,
  getAnalytics,
  handleUpdateVisitHistory,
} = require("../controllers/url");

router.post("/", handleGenerateShortUrl);
router.get("/:shortId", handleUpdateVisitHistory);
router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
