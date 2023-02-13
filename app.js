const express = require("express");
const qrcode = require("qrcode");
const port = process.env.PORT || 3000;
const app = express();
app.get("/generate", async function (req, res) {
  try {
    let text = req.query.text;
    if (typeof text !== "undefined" && text !== "") {
      qrcode.toFileStream(res, text, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send({ message: err });
        }
      });
    } else {
      res.status(400).send({ message: "Please provide a valid text as input" });
    }
  } catch (error) {
    res.status(400).send({ message: error });
  }
});
app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
