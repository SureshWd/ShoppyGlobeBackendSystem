const express = require("express");
const router = express.Router();
const Cart = require("../controller/Cart.Controller.js");
const verifyAccessToken = require("../middleware/auth.Middleware.js");

router.post("/cart",verifyAccessToken,Cart.addToCart);
router.put("/cart/:id",verifyAccessToken,Cart.updateCart);
router.delete("/cart/:id",verifyAccessToken,Cart.removeFromCart);

module.exports = router;