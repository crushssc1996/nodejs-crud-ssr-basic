// const express = require('express');
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import initAPIRoutes from "./routes/api";
import connection from "./configs/connectDB";
import morgan from "morgan";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middlware -> Code run top to bottom,
// if Valid, call Next to go next.
app.use((req, res, next) => {
  console.log(">> run into middleware ");
  console.log(req.method);
  next();
});

// setup write logs middleware
app.use(morgan("combined"));

//setup payload in body of request methods and send to server
//vice versa
//Middleware to config body data of req
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup view engine
configViewEngine(app);

// setup web routes
initWebRoutes(app);

// setup api routes
initAPIRoutes(app);

// Middleware to return 404 page
app.use((req, res) => {
  return res.render("404page.ejs");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
