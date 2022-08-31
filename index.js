const express = require("express");
const app = express();
const port = 3000;
const { flyRouter, gFlyInfo, getNextIndex} = require('./routers/fly-router')

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/fly', flyRouter)
app.use(express.static('public'))


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
// function Helloworld(name, object, cb) {
//   let outputLocal = `Hi ${name} you are fly in fly number ${object.name}`;
//   if (typeof cb == "function") {
//     cb(outputLocal);
//   }
// }

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

// app.get("/hello-world/:name", (req, res) => {
//   let name = req.params.name;
//   res.send("done");
// });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

