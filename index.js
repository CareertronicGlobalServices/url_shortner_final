const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const URL = require("../URLShortner/models/url");
const urlRouter = require("./router/url");
const userRouter = require("./router/user");
const staticRouter = require("./router/staticPages");
const path = require("path");
const { connectMongoDB } = require("./connection/connection");
const cookieParser = require("cookie-parser");
const { maintainLoggedInUser } = require("./middleware/userLogin");

//connection
connectMongoDB();
//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());
app.use("/url", maintainLoggedInUser); //inline middleware

//viewengiene - EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//routers
app.use("/", staticRouter);
app.use("/url", urlRouter);
app.use("/user", userRouter);

//server
app.listen(port, () => console.log(`Server Established at ${port}`));
