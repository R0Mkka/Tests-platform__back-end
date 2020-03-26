var usersController = require('./users/users.controller');

module.exports = function(app) {
  app.use('/users', usersController);
}
