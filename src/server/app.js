const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const multer = require("multer");
const bodyParser = require("body-parser");
const expressStaticGzip = require('express-static-gzip');

import router from './routes';

// load env variables
dotenv.config({ path: path.resolve(__dirname, './config/config.env') });

const app = express();

// app.use('*', expressStaticGzip(path.join(__dirname), {
//     index: false,
//     enableBrotli: true,
//     orderPreference: ['br', 'gz']
//   }));
app.use(express.static(path.join(__dirname, 'static')))
app.use(bodyParser.json());
app.use(multer({ dest: path.resolve('./tmp/') }).any());
app.use(router);


// app.listen(PORT, () => {
//     console.log(`server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
//   })

export default app;
