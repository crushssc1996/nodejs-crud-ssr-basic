const express = require('express');
import configViewEngine from './configs/viewEngine';
import initWebRoutes from './routes/web';
import connection from './configs/connectDB';

require('dotenv').config()

const app = express();
const port  = process.env.PORT || 3000;

// setup view engine
configViewEngine(app);

// setup web routes
initWebRoutes(app);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})