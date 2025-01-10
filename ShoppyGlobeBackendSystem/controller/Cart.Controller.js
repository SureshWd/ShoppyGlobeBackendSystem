const Cart = require("../model/Cart.Model.js");
const Product = require("../model/Product.Model.js");

exports.addToCart = async (req, res) => {
    const {productId, quantity } = req.body;
    const userId = req.userId;

    if (!userId) {
        return res.status(403).json({
            message: "Unauthorized! Invalid or missing token.",
            status: 403,
            success: false,
        });
    }

    if (!productId || !quantity) {
        return res.status(400).json({
            message: "Please provide userId, productId, and quantity in the body! || pass token in header",
            status: 400,
            success: false
        });
    }

    try {
        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found!",
                status: 404,
                success: false
            });
        }

        // Check if a cart exists for the user
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            // Create a new cart if none exists
            cart = new Cart({
                userId,
                items: [{ productId, quantity }]
            });
        } else {
            // Check if the product already exists in the cart
            const existingItem = cart.items.find(item => item.productId.toString() === productId);
            if (existingItem) {
                existingItem.quantity += quantity; // Increment the quantity
            } else {
                cart.items.push({ productId, quantity });
            }
        }

        await cart.save();
        res.status(200).json({
            message: "Product added to cart!",
            status: 200,
            success: true,
            cart
        });

    } catch (error) {
        console.error("Add to cart error:", error.message);
        res.status(500).json({
            message: "Error adding to cart",
            error: error.message,
            status: 500,
            success: false
        });
    }
};


exports.updateCart = async (req, res) => {
    const {quantity } = req.body;
    const productId = req.params.id;
    const userId = req.userId;

    if (!productId || !quantity ||!userId) {
        return res.status(400).json({
            message: "Please provide productId in params and quantity in the body! || pass token in header!",
            status: 400,
            success: false
        });
    }

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found!",
                status: 404,
                success: false
            });
        }

        const item = cart.items.find(item => item.productId.toString() === productId);
        if (item) {
            item.quantity = quantity; // Update quantity
            await cart.save();
            res.status(200).json({
                message: "Cart updated successfully!",
                status: 200,
                success: true,
                cart
            });
        } else {
            res.status(404).json({
                message: "Product not found in cart!",
                status: 404,
                success: false
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error updating cart",
            error: error.message,
            status: 500,
            success: false
        });
    }
};


exports.removeFromCart = async (req, res) => {
    const userId = req.userId;
    const productId = req.params.id;

    if (!productId || !userId) {
        return res.status(400).json({
            message: "Please provide productId in the params! || pass token in header",
            status: 400,
            success: false
        });
    }

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found!",
                status: 404,
                success: false
            });
        }

        // Filter out the product to remove it
        const initialLength = cart.items.length;
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        if (initialLength === cart.items.length) {
            return res.status(404).json({
                message: "Product not found in cart!",
                status: 404,
                success: false
            });
        }

        await cart.save();
        res.status(200).json({
            message: "Product removed from cart successfully!",
            status: 200,
            success: true,
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Error removing product from cart",
            error: error.message,
            status: 500,
            success: false
        });
    }
};
