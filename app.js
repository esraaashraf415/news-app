// const express = require('express')
// const path = require('path')
// const publicDirect = path.join(__dirname,"../public")
// const app = express()
// const port = process.env.PORT || 3000
// const hbs = require('hbs')
// app.use(express.static(publicDirect))
// app.set('view engine', 'hbs');
// const partialPath = path.join(__dirname , '../tempelates/partials')
// hbs.registerPartials(partialPath)
// const url="https://newsapi.org/v2/everything?q=keyword&apiKey=b7131985b8624592aee1b8c4f90972be"
        
// app.get('/', (req, res) => {

//       const pathView =  path.join(__dirname,"./views")
//  app.set('views', pathView);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
const express = require("express");
const hbs = require("hbs");
const path = require("path"); // core module
//const news = require("../tools/news");
const request = require("request");
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "./views");
// const partialsPath = path.join(__dirname, "../tempelates/partials");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicDirectory));
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
      } else if (response.body.message) {
        console.log(response.body.message);
      } else if (response.body.totalResults == 0) {
        console.log("No Data");
      } 
      else {
       // console.log("hi");
        res.render("index", {
          data: response.body.articles
          // articles0: response.body.articles[0],
          // articles1: response.body.articles[1],
          // articles2: response.body.articles[2],
          // articles3: response.body.articles[3],
          // articles4: response.body.articles[4],
          // articles5: response.body.articles[5],
          // articles6: response.body.articles[6],
        });
      }
    }
  );
});
app.get("/about", (req, res) => {
  res.render("underDevelping", { title: "about" });
});
app.get("/*", (req, res) => {
  res.render("404", { title: "error" });
});

app.listen(port, (req, res) => {});