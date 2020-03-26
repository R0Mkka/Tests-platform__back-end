const jwt = require('jsonwebtoken');

class AuthService {
  generateJwt({ userId, firstName, lastName, email, roleId, status }) {
    const expiry = new Date();
  
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      userId,
      firstName,
      lastName,
      email,
      roleId,
      status,
      exp: parseInt(expiry.getTime() / 1000),
    }, process.env.SECRET_KEY);
  }
}

module.exports = new AuthService();