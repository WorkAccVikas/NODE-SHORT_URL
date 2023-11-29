const { nanoid } = require("nanoid");
const urlModel = require("../model/urlModel");

async function handleGenerateNewShortURL(req, res) {
  const { url } = req.body;
  console.log(
    `🚀 ~ file: urlController.js:6 ~ handleGenerateNewShortURL ~ url:`,
    req.body
  );
  if (!url || typeof url !== "string")
    return res
      .status(400)
      .json({ error: "Enter valid url or url is required" });

  const shortId = nanoid(8);

  console.log(
    `🚀 ~ file: urlController.js:5 ~ handleGenerateNewShortURL ~ shortId:`,
    shortId
  );

  const result = await urlModel.create({
    shortId,
    redirectURL: url,
    // visitHistory: [],
    createdBy: req.user._id,
  });
  
  console.log(
    `🚀 ~ file: urlController.js:23 ~ handleGenerateNewShortURL ~ res:`,
    result
  );

  return res.render("home1", {
    id: shortId,
  });

  return res.status(201).json({ id: shortId });
}

async function handleGetAnalytics(req, res) {
  let { shortId } = req.params;
  if (!shortId || typeof shortId !== "string")
    return res.status(400).json({ error: "Please enter valid shortID" });

  const result = await urlModel.findOne({ shortId });

  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytic: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
