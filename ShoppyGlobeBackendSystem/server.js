const express = require("express");
const connectDB = require("./config/db.js");
const UserRoutes = require("./route/User.Route.js");
const ProductRoutes = require("./route/Product.Route.js");
const CartRoutes = require("./route/Cart.Route.js");
const logger = require("./utils/log.Util.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(logger);

connectDB();

app.use("/api/v1",UserRoutes);
app.use("/api/v1",ProductRoutes);
app.use("/api/v1",CartRoutes);

const PORT = process.env.PORT || 6000;

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})