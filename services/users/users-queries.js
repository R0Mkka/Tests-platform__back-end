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

  getUserByEmail: `
    SELECT
      *
    FROM
      users
    WHERE
      email = ?;
  `,

  addUser: `
    INSERT INTO users (
      firstName,
      lastName,
      userRoleId,
      email,
      password
    )
    VALUES (?,?,?,?,?);
  `
};

module.exports = usersQueries;