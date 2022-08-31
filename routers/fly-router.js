const express = require("express");
const flyRouter = express.Router();
const { getFlights, getFly, createFly, updateFly ,patchFly, deleteFly} = require("../controllers/fly-controller");

flyRouter.get("/", getFlights);
flyRouter.get("/:id", getFly);
flyRouter.post("/", createFly);
flyRouter.put("/:id", updateFly );
flyRouter.patch("/:id", patchFly);
flyRouter.delete("/:id", deleteFly);

module.exports = { flyRouter };
