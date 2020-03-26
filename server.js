if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var applyControllers = require('./controllers');
var PORT = process.env.PORT;

var app = express();

app.use(cors());
app.use(bodyParser.json());

applyControllers(app);

app.listen(PORT, function() {
  console.log('The server is listening on port ' + PORT + '...');
});