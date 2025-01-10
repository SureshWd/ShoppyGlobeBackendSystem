const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

const verifyAccessToken = async (req, res, next) => {
    console.log("Request Headers:", req.headers);
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            message: "Access Denied! Missing or malformed token.",
            status: 403,
            success: false,
        });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);

        req.userId = decoded.userId;
        if (!decoded.userId) {
            return res.status(403).json({
                message: "Invalid Token. User ID missing.",
                status: 403,
                success: false,
            });
        }

        next(); 
    } catch (error) {
        console.log("Token verification error:", error.message);
        return res.status(403).json({
            message: "Access Denied! Invalid or expired token.",
            status: 403,
            success: false,
            error: error.message,
        });
    }
};

module.exports = verifyAccessToken;