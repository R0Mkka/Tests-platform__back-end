const bcrypt = require('bcrypt');
const getDatabase = require('../../database');
const database = getDatabase();

const usersQueries = require('./users-queries');

class UsersService {
  getUsers(req, res, next) {
    database.query(
      usersQueries.getUsers,
      (err, results) => {
        if (err) {
          return res.status(400).send(err);
        }
  
        return res.status(200).send(results);
      });
  }

  getUserById(req, res, next) {
    database.query(
      usersQueries.getUserById,
      [req.params.id],
      (err, users) => {
        const user = users[0];

        if (err) {
          return res.status(400).send(err);
        }

        if (!user) {
          return res.status(404).send({
            status: 404,
            message: 'User not found',
          });
        }

        return res.status(200).send(user);
      }
    );
  }

  async addUser(req, res, next) {
    const queryParams = await this.formatUserDataFromBody(req.body);

    database.query(
      usersQueries.addUser,
      queryParams,
      (err, results) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).send({
              status: 400,
              message: 'User with such email already exists',
            });
          }

          return res.status(400).send(err);
        }

        return res.status(201).send({
          newUserId: results.insertId,
        });
      },
    );
  }

  editUser(req, res, next) {
    res.status(201).send(req.body);
  }

  deleteUser(req, res, next) {
    res.status(201).send(req.body);
  }

  async formatUserDataFromBody({ firstName, lastName, roleId, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return [
      firstName,
      lastName,
      roleId,
      email,
      hashedPassword,
    ];
  }
}

module.exports = new UsersService();
