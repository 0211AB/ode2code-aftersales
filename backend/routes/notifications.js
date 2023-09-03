const express = require("express");
const router = new express.Router();
const controller = require("../controllers/notification");
const authUser = require("../middleware/auth")

router.get("/notifications/all", authUser, controller.getAllNotifications);
router.post("/notifications/create", authUser, controller.createNewNotifications);
router.put("/notifications/update", authUser, controller.updateNotifications);

module.exports = router;