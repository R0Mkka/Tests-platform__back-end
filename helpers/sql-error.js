class SqlError {
  constructor({ code, errno, sqlState, sqlMessage }) {
    this.code = code;
    this.errno = errno;
    this.sqlState = sqlState;
    this.sqlMessage = sqlMessage;
  }
}

module.exports = SqlError;