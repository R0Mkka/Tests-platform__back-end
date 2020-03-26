const mysql = require('mysql2');
const databaseConfig = require('./config');

let databasePool = null;

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
