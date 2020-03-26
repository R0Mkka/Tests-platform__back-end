const passportJwt = require('passport-jwt');

const { ExtractJwt } = passportJwt;

const usernameField = 'email';

module.exports.jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: process.env.SECRET_KEY,
  usernameField,
};

module.exports.localOptions = {
  usernameField,
  session: false,
};
