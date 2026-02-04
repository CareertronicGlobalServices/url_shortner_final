const shortID = require("short-id");
const URL = require("../models/url");

async function handleGenerateShortUrl(req, res) {
  // const body = req.body;
  // console.log(body);
  const { redirectURL } = req.body;
  if (!redirectURL) return res.status(404).json({ msg: "URL Required" });

  const shortId = shortID.generate();
  // console.log(shortId);
  await URL.create({
    shortId: shortId,
    redirectURL: redirectURL,
    visitHistory: [],
  });

  //return res.json({ id: shortId });
  return res.redirect("/home");
}

async function getAnalytics(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleUpdateVisitHistory(req, res) {
  const shortId = req.params.shortId;
  console.log(shortId);
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );
  res.redirect(entry.redirectURL);
}

async function getAllURLs(req, res) {
  const allURL = await URL.find({});
  //console.log(allURL);
  return res.render("Home", { allURL });
}

module.exports = {
  handleGenerateShortUrl,
  getAnalytics,
  handleUpdateVisitHistory,
  getAllURLs,
};
