const express = require("express");
const router = new express.Router();
const controller = require("../controllers/spare");
const mongoose = require("mongoose");
const auth = require("../middleware/auth");

router.get("/spare/all", controller.getAllSpareParts);
router.get("/spare/category", controller.getSparePartByCategory);
router.get("/spare/quantity", controller.getSparePartByQuantity);
router.get("/spare/location", controller.getSparePartByLocation);
router.put("/spare/update", controller.updateSparePartQuantity);
router.post("/spare/new",auth, controller.createNewSparePart);

module.exports = router;