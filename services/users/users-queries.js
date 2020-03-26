const usersQueries = {
  getUsers: `
    SELECT
      *
    FROM
      users;
  `,

  getUserById: `
    SELECT
      *
    FROM
      users
    WHERE
      userId = ?;
  `,

  addUser: `
    INSERT INTO users (
      firstName,
      lastName,
      roleId,
      email,
      password
    )
    VALUES (?,?,?,?,?);
  `
};

module.exports = usersQueries;