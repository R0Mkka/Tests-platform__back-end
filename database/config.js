const ENVIRONMENT = process.env;

const databaseConfig = {
  host: ENVIRONMENT.DB_HOST,
  user: ENVIRONMENT.DB_USER,
  password: ENVIRONMENT.DB_PASSWORD,
  database: ENVIRONMENT.DB_DATABASE,
};

module.exports = databaseConfig;
