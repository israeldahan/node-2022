const express = require("express");
const flyRouter = express.Router();
const flyController = require("../controllers/fly-controller");

flyRouter.get("/", flyController.getFlights);
flyRouter.get("/:id", flyController.getFly);
flyRouter.post("/", flyController.createFly);
flyRouter.put("/:id", flyController.updateFly );
flyRouter.patch("/:id", flyController.patchFly);
flyRouter.delete("/:id", flyController.deleteFly);

module.exports = { flyRouter };
