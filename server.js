if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const applyControllers = require('./controllers');
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(bodyParser.json());

applyControllers(app);

app.listen(PORT, () => console.log(`The server is listening on port ${PORT}...`));