const express = require("express");
const router = new express.Router();
const controller = require("../controllers/repairOrders");
const authUser = require("../middleware/auth")

router.get("/order/user", authUser, controller.getRepairsByUser);
router.post("/order/admin", authUser, controller.getRepairsByUserAdmin);
router.get("/order/list", authUser, controller.getRepairsList);
router.put("/order/update", authUser, controller.updateRepairStatus);

module.exports = router;