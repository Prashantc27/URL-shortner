const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require('./routes/url');
const URL = require('./models/url');

const app = express();
const port = 8000;

app.use(express.json());

app.set("view engine", "ejs");

app.get('/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId,
  },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      }
    });
  res.redirect(entry?.redirectURL);
});


app.use("/url", urlRoute);
connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() => console.log("Mongodb connected"));
app.listen(port, () => console.log("server started"));