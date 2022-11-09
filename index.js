const express = require("express");
const app = express();
const port = 3000;
var fs = require('fs');
const path = require("path");
var pixelWidth = require('string-pixel-width');

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// define a route handler for the default home page
app.get("/:text1-:text2-:color", (req, res) => {
  console.log(req.params);
  const { text1, text2, color } = req.params;
  textSize1 = pixelWidth(text1, { size: 16 }) + 20;
  textSize2 = pixelWidth(text2, { size: 16 }) + 20;
  const width = pixelWidth(text1, { size: 16 }) + 20;
  // res.render("index", {...req.params, textSize1: width, textSize2: pixelWidth(text2, {size: 16}) + 20});
  res.header('Content-Type', 'image/svg+xml');
  // '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="400" height="180"> <rect x="50" y="20" rx="20" ry="20" width="150" height="150" style="fill:red;stroke: black;stroke-width:5;opacity:0.5" /> </svg> ')

  
  res.send(Buffer.from(`<svg 
  xmlns='http://www.w3.org/2000/svg' 
  xmlns:xlink='http://www.w3.org/1999/xlink' 
  version='1.1' 
  width='${textSize1+textSize2}' 
  height='28'
  style='border-radius: 10px; overflow:hidden'
  >
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300");
  </style>
  <g shape-rendering="crispEdges">
    <rect width='${textSize1}' height="28" fill='${color}'></rect>
    <rect x='${textSize1}' width='${textSize2}' height="28" fill="red"></rect>
    </g>
    <g>
    <text font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji" x='11' y='20'>${text1}</text>
    <text font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji" x='${textSize1+10}' y='20'>${text2}</text>
    </g>
</svg>`));
});

// start the Express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

module.exports = app;