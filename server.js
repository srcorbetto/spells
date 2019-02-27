require('dotenv').config({path: __dirname + '/.env'});

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(require('./routes'));

app.listen(PORT, () => console.log(`Spells app listening on port ${PORT}!`));