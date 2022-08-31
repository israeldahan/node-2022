const INITIAL_FLIGHTS_ARRIVALS = require('./fly-arrivals.json')
const INITIAL_FLIGHTS_DEPARTURES = require('./fly-departures.json')

let allFlights = [];
let currentIndex = allFlights.length;

function getNextIndex() {
  return ++currentIndex;
}

function getAllFlights() {
  return allFlights
}

function getById(id) {
  let idFly = allFlights.find((fly) => fly.flyID == id);
  return idFly;
}

function createFly(fly) {
  fly.flyID = getNextIndex();
  allFlights.push(fly);
  return fly
}

function deleteFly(id) {
  let flyObj = getById(id);
  // returns array of id's examle: [2,1,3,4,6,5]
  const flyMap = allFlights.map((object) => object.flyID);
  // returns the index of id in array
  let index = flyMap.indexOf(id);
  //
  allFlights.splice(index, 1);
  return flyObj;
}

function updateFly (newFly, id){
  let { name, country, date } = newFly;
  allFlights.forEach((item) => {
    if (item.flyID == id) {
      item.name = name;
      item.country = country;
      item.date = date;
    }
  });
  const flyMap = allFlights.map((object) => object.flyID);
  let index = flyMap.indexOf(id);
  return allFlights[index]
}

function patchFly(flyData, id){
  const flyObj = getById(id);

  // update object
  const { name, country, date } = flyData;
  const defineObject = {
    ...(name && { name }),
    ...(country && { country }),
    ...(date && { date }),
  };
  const patchObject = { ...flyObj, ...defineObject };

  // update array with new object
  const flyMap = allFlights.map((object) => object.flyID);
  let index = flyMap.indexOf(id);
  allFlights[index] = patchObject;
  return allFlights[index]
}

function init() {
  INITIAL_FLIGHTS_ARRIVALS.Flights.forEach(element => {
    element.FlightsType = "arrivals"
  });
  INITIAL_FLIGHTS_DEPARTURES.Flights.forEach(element => {
    element.FlightsType = "departures"
  });
  allFlights = [...INITIAL_FLIGHTS_ARRIVALS.Flights, ...INITIAL_FLIGHTS_DEPARTURES.Flights ]
  allFlights.forEach(item => {
    item.flyID = getNextIndex()
  })
  // currentIndex = allFlights[allFlights.length - 1].id
}

init()
module.exports = { getAllFlights, getById , createFly, deleteFly, updateFly, patchFly};
