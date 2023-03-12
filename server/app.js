require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const connectToDB = require("./config/db");
const userRoutes = require("./route/userRoutes");
const productRoutes = require("./route/productRoutes");
const orderRoutes = require("./route/orderRoutes");
const paymentRoutes = require("./route/paymentRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(express.static("./public"));

app.use(
    fileUpload({
        useTempFiles: true,
        // tempFileDir: "/tmp/",
    }));

// MongoDb connect
connectToDB();

//Routes
app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", orderRoutes);
app.use("/", paymentRoutes);

module.exports = app;


