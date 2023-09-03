const express = require("express");
const router = new express.Router();
const controller = require("../controllers/products");
const auth = require("../middleware/auth");

router.get("/products/home", controller.getHomeProducts);
router.get("/products/all", controller.getAllProducts);
router.get("/products/search", controller.getProductsbyName);
router.get("/products/spare", controller.getSparefromProducts);
router.get("/products/list", controller.listProducts);
router.post("/products/add", controller.addNewProduct);
router.get("/products/all-list", controller.getAllProductsList);

module.exports = router;