var mysql = require('mysql2');
var databaseConfig = require('./config');

var databasePool = null;

function makePool() {
  return mysql.createPool(databaseConfig);
}

function getDatabasePool() {
  if (!databasePool) {
    databasePool = makePool();
  }

  return databasePool;
}

module.exports = getDatabasePool;
