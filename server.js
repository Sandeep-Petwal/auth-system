// Imports
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.set('trust proxy', 1);

 
// Cron job to keep server alive (because of Render free tier);
require('./util/cron');

// Routes
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.HOST}:${process.env.PORT}`);
});