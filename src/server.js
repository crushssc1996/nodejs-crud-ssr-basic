// const express = require('express');
import express from 'express';
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web';
import connection from './configs/connectDB';

require('dotenv').config()

const app = express();
const port  = process.env.PORT || 3000;

//setup payload in body of request methods and send to server 
//vice versa
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// setup view engine
configViewEngine(app);

// setup web routes
initWebRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})