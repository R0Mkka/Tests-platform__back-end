const express = require('express');
const passport = require('passport');
const router = express.Router();

const authService = require('../../auth/auth.service.js');

const CustomError = require('../../helpers/custom-error');
const handleResponseError = require('../../helpers/handle-response-error');

// USER LOGIN
router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user) => {
    if (err) {
      return handleResponseError(res, err);
    }

    if (!user) {
      return res.status(404).send(new CustomError(404, 'User not found'));
    }

    const token = authService.generateJwt(user);

    return res.status(200).send({ token });
  })(req, res, next);
});

module.exports = router;