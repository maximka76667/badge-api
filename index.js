const express = require("express");
const app = express();
const port = 3000;
var fs = require('fs');
const path = require("path");
var pixelWidth = require('string-pixel-width');

app.use(express.static(path.join(__dirname, "public")));

function convertColor(color) {
  return "#" + color;
}

function getPixelWidth(text, isLetterSpacing) {
  if(isLetterSpacing) {
    return (pixelWidth(text, { size: 13, bold: true }) + 22) * 1.2;
  }
  return pixelWidth(text, { size: 13, bold: true }) + 20;

}

// define a route handler for the default home page
app.get("/:text1-:text2-:color1-:color2-:bgColor1-:bgColor2", (req, res) => {
  console.log(req.params);
  const { text1, text2, color1, color2, bgColor1, bgColor2 } = req.params;
  const [textColor1, textColor2, boxColor1, boxColor2] =[convertColor(color1), convertColor(color2), convertColor(bgColor1), convertColor(bgColor2)];
  const textSize1 = getPixelWidth(text1, false);
  const textSize2 = getPixelWidth(text2, true);
  
  res.header('Content-Type', 'image/svg+xml');
  
  res.send(Buffer.from(`<svg 
  xmlns='http://www.w3.org/2000/svg' 
  xmlns:xlink='http://www.w3.org/1999/xlink' 
  version='1.1' 
  width='${textSize1+textSize2}' 
  height='28'
  style='border-radius: 10px; overflow:hidden'
  >
  <g shape-rendering="crispEdges">
    <rect width='${textSize1}' height="28" fill='${boxColor1}'></rect>
    <rect x='${textSize1}' width='${textSize2}' fill='${boxColor2}' height="28"></rect>
    </g>
    <g font-size="11">
    <text 
    font-weight="bold"
    fill='${textColor1}' font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji" x='10' y='18'>${text1.toUpperCase()}</text>
    <text
      font-weight="bold"
      letter-spacing="1.5"
    fill='${textColor2}' font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji" x='${textSize1+10}' y='18'>${text2.toUpperCase()}</text>
    </g>
</svg>`));
});

// start the Express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

module.exports = app;