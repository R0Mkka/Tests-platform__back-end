var getDatabase = require('../../database');
var database = getDatabase();

var usersService = {
  getUsers: function(req, res, next) {
    database.query(
      'SELECT * FROM users',
      function(err, results, fields) {
        if (err) {
          return res.status(400).send(err);
        }

        res.status(200).send(results);
      });
  },
  addUser: function(req, res, next) {    
    res.status(201).send(req.body);
  },
};

module.exports = usersService;