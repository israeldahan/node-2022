const express = require("express");
const app = express();
const port = 3000;
const {flyRouter, gFlyInfo, getNextIndex } = require('./routers/fly.router')
app.use('/fly', flyRouter)



app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// http://localhost:3000?limit=10&offset=5
// limit = 20 items, offset = 10: from item 5

// let obj = {
// "flyID": 1,
// "name": "k101",
// "country": "Israel",
// "date": "01-08-2022 5:28"
// }

// function a_afterHelloWorld(output){
//     let out = `a_afterHelloWorld is done output is: ${output}`
//     console.log(out)
// }
// function b_afterHelloWorld(output){
//     let out = `b_afterHelloWorld output is: ${output}`
//     console.log(out)
// }

// //
function Helloworld(name, object, cb) {
  let outputLocal = `Hi ${name} you are fly in fly number ${object.name}`;
  if (typeof cb == "function") {
    cb(outputLocal);
  }
}

// Helloworld("israel", {name: "moshe"}, (output) => {
//     let out = `b_afterHelloWorld output is: ${output}`
//     console.log(out)
// })

// function getDemo(route, cb){
//     console.log(route);
//     let requestDemo = {
//         flyDemo : (route) => {console.log(route);}
//     }
//     let responseDemo = {
//         status : (route) => {console.log(route);}
//     }
//     cb(requestDemo, responseDemo)

// }
// let t = (req, res)=> {
//     console.log(`req.flyDemo is: ${req.flyDemo}`)
//     console.log(`res.flyDemo is: ${res.status()}`)
// }

app.get("/hello-world/:name", (req, res) => {
  let name = req.params.name;
  res.send("done");
});

app.post("/", (req, res) => {
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

app.put("/:id", (req, res) => {
  let { name, country, date } = req.body;

  gFlyInfo.forEach((item) => {
    if (item.flyID == req.params.id) {
      item.name = name;
      item.country = country;
      item.date = date;
    }
  });
  res.send(gFlyInfo);
});

app.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  // get object from array
  const flyObj = getById(id);

  // update object
  const { name, country, date } = req.body;
  const defineObject = {
    ...(name && { name }),
    ...(country && { country }),
    ...(date && { date }),
  };
  const patchObject = { ...flyObj, ...defineObject };

  // update array with new object
  const flyMap = gFlyInfo.map((object) => object.flyID);
  let index = flyMap.indexOf(id);
  gFlyInfo[index] = patchObject;
  res.send(gFlyInfo);
});

function getById(id) {
  let idFly = gFlyInfo.find((fly) => fly.flyID == id);
  return idFly;
}

app.delete("/:id", (req, res) => {
  // let {name, country, date} = req.body;
  let id = parseInt(req.params.id);
  // returns array of id's examle: [2,1,3,4,6,5]
  const flyMap = gFlyInfo.map((object) => object.flyID);
  // returns the index of id in array
  let index = flyMap.indexOf(id);
  //
  gFlyInfo.splice(index, 1);
  res.send(gFlyInfo);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

