const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const usersService = require('../services/users/users.service');

const { localOptions } = require('./passport.config');

passport.use(
  'login',
  new LocalStrategy(localOptions, async (email, password, done) => {
    try {
      const user = await usersService.getUserByEmail(email, true);

      if (!user) {
        done(null, false);
      } else {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user);
        }

        return done(null, false);
      }
    } catch (error) {
      done(error);
    }
  }),
);