if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const applyControllers = require('./controllers');
const PORT = process.env.PORT;

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

applyControllers(app);

app.listen(PORT, () => console.log(`The server is listening on port ${PORT}...`));