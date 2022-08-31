const flyService = require('../services/fly-service')


function getFlights(req, response) {
  let { limit, offset } = req.query;
  let newGFlyInfo = flyService.allFlights;

  if (offset) {
    offset = parseInt(offset, 10);
    newGFlyInfo = newGFlyInfo.slice(offset);
  }

  if (limit) {
    limit = parseInt(limit, 10);
    newGFlyInfo = newGFlyInfo.slice(0, limit);
  }

  response.send(newGFlyInfo);
}

function getFly(req, response) {
  const id = parseInt(req.params.id);
  const flyObj = flyService.getById(id);
  if(!!flyObj){
      response.status(200).json(flyObj)
  } else {
    response.status(404).send(`Not Found any fly in id ${id}`)
  }
}

function createFly(req, res) {
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

  const flyObj = flyService.createFly(fly)
  res.status(201).json({"response": flyObj});
}


function updateFly (req, res) {
  const id = parseInt(req.params.id);
  const fly = flyService.getById(id)
  let flyObj = {}
  if (!!fly){
    flyObj = flyService.updateFly(req.body, id)
    res.send(flyObj)
  } else {
    flyObj = flyService.createFly(req.body)
  }
  res.send(flyObj);
}


function patchFly (req, res) {
  const id = parseInt(req.params.id);
  // get object from array
  let flyObj = flyService.patchFly(req.body, id)
  res.send(flyObj);
}

function deleteFly (req, res){
  // let {name, country, date} = req.body;
  let id = parseInt(req.params.id);
  const flyObj = flyService.deleteFly(id)
  res.status(200).json(flyObj);
}

module.exports = { getFlights, getFly, createFly, updateFly, patchFly, deleteFly };
