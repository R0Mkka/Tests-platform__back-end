if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');

const applyControllers = require('./controllers');
const PORT = process.env.PORT;

const app = express();

require('./auth');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

applyControllers(app);

app.listen(PORT, () => console.log(`The server is listening on port ${PORT}...`));