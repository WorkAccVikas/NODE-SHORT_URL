require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const mongoConnection = require("./connection/connection");
const PORT = process.env.PORT || 4000;

const urlRoute = require("./routes/urlRoutes");
const staticRoute = require("./routes/staticRouter");
const urlModel = require("./model/urlModel");

mongoConnection();
app.use(express.json());

// NOTE : It is used when data pass from form data (Frontend)
app.use(express.urlencoded({ extended: false }));

// console.log(path.join(__dirname, "public"));

// POINT : Configure css file with ejs file => CSS file : ./public/styles/home1.css
app.use(express.static(path.join(__dirname, "public")));

// POINT : SETUP EJS
app.set("view engine", "ejs");

// POINT : SETUP VIEW FOLDER PATH
app.set("views", path.resolve("./view"));

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
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

// NOTE : (❌) Bad Way for Server-side rendering
app.get("/test", async (req, res) => {
  const allURL = await urlModel.find({});
  return res.end(`
  <html>
    <head></head>
    <body>
      <ol>
        ${allURL.map(
          (item) =>
            `<li>${item.shortId} - ${item.redirectURL} - ${item.visitHistory.length}</li>`
        )}
      </ol>
    </body>
  </html>
  `);
});

// NOTE : (✅) Correct Way for Server-side rendering
app.get("/test1", async (req, res) => {
  const allURL = await urlModel.find({});
  return res.render("home", {
    urls: allURL,
  });
});

app.listen(PORT, () =>
  console.log(`Server running : http://localhost:${PORT}`)
);
