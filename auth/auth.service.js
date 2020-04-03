const jwt = require('jsonwebtoken');

class AuthService {
  generateJwt({ userId, firstName, lastName, email, userRoleId, status }) {
    const expiry = new Date();
  
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      userId,
      firstName,
      lastName,
      email,
      userRoleId,
      status,
      exp: parseInt(expiry.getTime() / 1000),
    }, process.env.SECRET_KEY);
  }
}

module.exports = new AuthService();