const express = require("express");
const router = new express.Router();
const controller = require("../controllers/partRequests");
const authUser = require("../middleware/auth")

router.post("/request/new", authUser, controller.createRequest);
router.get("/request/user", authUser, controller.getRequestsByUser);
router.post("/request/id", authUser, controller.getRequestsById);
router.post("/request/update", authUser, controller.updateRequestsById);
router.get("/request/revenue", authUser, controller.getRevenueData);
router.get("/request/share", authUser, controller.getShareData);
router.get("/request/all", authUser, controller.getAllRequests);

module.exports = router;