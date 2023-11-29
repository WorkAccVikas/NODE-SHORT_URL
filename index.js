require("dotenv").config();

const express = require("express");
const app = express();
const mongoConnection = require("./connection/connection");
const PORT = process.env.PORT || 4000;

const urlRoute = require("./routes/urlRoutes");
const urlModel = require("./model/urlModel");

mongoConnection();
app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const entry = await urlModel.findOneAndUpdate(
    { shortId: req.params.shortId },
    {
      $push: {
        visitHistory: {
          timestamps: Date.now(),
        },
      },
    },
    {
      new: true,
    }
  );

  console.log(entry);

  return res.redirect(entry.redirectURL);
});

app.listen(PORT, () =>
  console.log(`Server running : http://localhost:${PORT}`)
);
