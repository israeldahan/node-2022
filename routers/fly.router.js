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
  


  flyRouter.post("/", (req, res) => {
    const { name, country, date } = req.body;
    let error = [];
    if (!name) {
      error.push("missing name in body requst");
    }
    if (!country) {
      error.push("missing country in body requst");
    }
    if (!date) {
      error.push("missing date in body requst");
    }
  
    if (error.length) {
      res.status(400).send(error);
    }
  
    let fly = req.body;
    fly.flyID = getNextIndex();
    gFlyInfo.push(fly);
    res.send("Done!!! fly save successfuly");
  });
  

module.exports = {flyRouter, gFlyInfo, getNextIndex};