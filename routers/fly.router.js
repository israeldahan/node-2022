const express = require("express");
const flyRouter = express.Router()

let gFlyInfo = [];
let currentIndex = gFlyInfo.length;
function getNextIndex() {
  return ++currentIndex;
}

flyRouter.get("/", (req, response) => {
    let { limit, offset } = req.query;
    let newGFlyInfo = gFlyInfo;
  
    if (offset) {
      offset = parseInt(offset, 10);
      newGFlyInfo = newGFlyInfo.slice(offset);
    }
  
    if (limit) {
      limit = parseInt(limit, 10);
      newGFlyInfo = newGFlyInfo.slice(0, limit);
    }
  
    response.send(newGFlyInfo);
  });
  

module.exports = {flyRouter, gFlyInfo, getNextIndex};