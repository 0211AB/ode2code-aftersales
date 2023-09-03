const express = require("express");
const router = new express.Router();
const controller = require("../controllers/user");
const mongoose = require("mongoose");
const authUser = require("../middleware/auth");

router.post("/user/signup", controller.signupUser);
router.post("/user/signin", controller.loginUser);
router.put("/user/update-role", authUser, controller.updateUserRole);
router.post("/user/create", authUser, controller.loginUser);
router.get("/user/details", authUser, controller.getUserDetails);
router.post("/user/pickup", authUser, controller.requestPickup);
router.get("/user/admin-list", authUser, controller.getAllAdmins);
router.get("/user/user-list", authUser, controller.getAllUsers);


module.exports = router;