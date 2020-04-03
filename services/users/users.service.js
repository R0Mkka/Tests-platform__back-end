const bcrypt = require('bcrypt');
const getDatabase = require('../../database');
const database = getDatabase();

const CustomError = require('../../helpers/custom-error');
const SqlError = require('../../helpers/sql-error');

const usersQueries = require('./users-queries');

class UsersService {
  getUsers() {
    return new Promise((resolve, reject) => {
      database.query(
        usersQueries.getUsers,
        (err, users) => {
          if (err) {
            return reject(new SqlError(err))
          }

          users = users.map(user => this.getSecureUserData(user));
    
          resolve(users);
        });
    });
  }

  getUserById(userId) {
    return new Promise((resolve, reject) => {
      database.query(
        usersQueries.getUserById,
        [userId],
        (err, users) => {  
          if (err) {
            return reject(new SqlError(err));
          }

          const user = users[0];
  
          if (!user) {
            return reject(new CustomError(404, 'User not found'));
          }
  
          resolve(this.getSecureUserData(user));
        }
      );
    });
  }

  getUserByEmail(userEmail, withPassword = false) {
    return new Promise((resolve, reject) => {
      database.query(
        usersQueries.getUserByEmail,
        [userEmail],
        (err, users) => {  
          if (err) {
            return reject(new SqlError(err));
          }

          const user = users[0];
  
          if (!user) {
            return reject(new CustomError(404, 'User not found'));
          }
  
          if (withPassword) {
            return resolve(user);
          }

          resolve(this.getSecureUserData(user));
        }
      );
    });
  }

  getSecureUserData(userData) {
    const { password, ...otherData } = userData;

    return otherData;
  }

  async addUser(userData) {
    const queryParams = await this.formatUserData(userData);

    return new Promise((resolve, reject) => {
      database.query(
        usersQueries.addUser,
        queryParams,
        (err, sqlResponse) => {
          if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
              return reject(new CustomError(400, 'User with such email already exists'));
            }
  
            return reject(new SqlError(err));
          }
  
          resolve({
            newUserId: sqlResponse.insertId,
          });
        },
      );
    });
  }

  async formatUserData({ firstName, lastName, userRoleId, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return [
      firstName,
      lastName,
      userRoleId,
      email,
      hashedPassword,
    ];
  }
}

module.exports = new UsersService();
