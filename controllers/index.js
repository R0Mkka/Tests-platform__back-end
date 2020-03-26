const passport = require('passport');

const usersController = require('./users/users.controller');
const mainController = require('./main/main.controller');

module.exports = function(app) {
  app.use('/', mainController);
  app.use('/users', passport.authenticate('jwt', { session: false }), usersController);
}
