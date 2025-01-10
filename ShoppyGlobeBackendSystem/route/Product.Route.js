const express = require("express");
const router = express.Router();
const Product = require("../controller/Product.Controller.js");

router.get("/products/", Product.getProducts);
router.get("/products/:id", Product.getProduct);
router.post("/products", Product.createProduct);
router.put("/products/:id", Product.updateProduct);
router.delete("/products/:id", Product.deleteProduct);

module.exports = router;