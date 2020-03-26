const passport = require('passport');
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;

const usersService = require('../services/users/users.service');

const { jwtOptions } = require('./passport.config');

passport.use(
  'jwt',
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await usersService.getUserById(jwtPayload.userId);

      if (user) {
        return done(null, user);
      }
      
      return done(null, false);
    } catch (error) {
      done(error);
    }
  }),
);
