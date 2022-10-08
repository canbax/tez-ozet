const express = require("express");
const app = express();
const cypress = require("cypress");

const baseUrl = "http://namazvakitleri.diyanet.gov.tr/tr-TR/";

/** use this function like `app.use(allowOrigion4All);` for an express app
 * Make API accessiable for all clients. Not for only clients from a specific domain.
 */
function allowOrigin4All(_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}

const getData = async (req, res) => {
  //   const url = baseUrl + req.query.region;
  const results = await cypress.run({
    reporter: "junit",
    browser: "chrome",
    config: {
      video: false,
    },
    headless: true,
  });
  console.log(results);
  res.send(results);
};

app.use(allowOrigin4All);
app.use(express.static("public"));

app.get("/api/data", getData);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("namaz vakti API listening on 3000"));
