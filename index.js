const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
const administrator = require('./routes/administratorRoutes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use('/images', express.static(__dirname + '/uploads/images/'));

/**
 * redirecting administrator request to administrator routes
 */
app.use('/administrator', administrator);

app.use('/', (req, res) => res.send("Welcome to JJ General Store !"));
app.listen(process.env.PORT, () => console.log('Server is ready on localhost:' + process.env.PORT));