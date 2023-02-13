const express = require("express");
const qrcode = require("qrcode");
const port = process.env.PORT || 3000;
const app = express();
app.get("/", async function (req, res) {
  res.status(200).send({
    message:
      "quary this api by using tis endpoint and quary /generate?text= at the end of this url and then the text you want to turn into a qrcode.The qr code is return as an blob no json data will be returned",
  });
});
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
  console.log(`API listening PORT ${port}`);
});
