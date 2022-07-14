
const express = require("express");
const hbs = require("hbs");
const path = require("path"); 
const request = require("request");
const public = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "./views");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(public));
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(viewsPath);

const url ="https://newsapi.org/v2/top-headlines?country=eg&apiKey=b7131985b8624592aee1b8c4f90972be";
app.get("/", (req, res) => {
  request(
    {
      url: url,
      json: true,
      headers: {
        "User-Agent": "MY IPHINE 7s",
      },
    },
    (error, response) => {
      if (error) {
        console.log("Error");
      } 
      else if (response.body.message) {
        console.log(response.body.message);
      } 
      else if (response.body.totalResults == 0) {
        console.log("No Data");
      } 
      else {
        res.render("index", {
          data: response.body.articles
        
        });
      }
    }
  );
});


app.listen(port, () => console.log(`app is listening on ${port}`));
