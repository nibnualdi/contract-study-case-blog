const dotenv = require("dotenv");

dotenv.config();

const databaseName = process.env.DATABASE_NAME;
const userNameDatabase = process.env.USERNAME_DATABASE || "root";
const passDatabase = process.env.PASS_DATABASE || undefined;
const hostDatabase = process.env.HOST_DATABASE || "localhost";
const dialectDatabase = process.env.DIALECT_DATABASE || "mysql";

module.exports = {
  development: {
    username: userNameDatabase,
    password: passDatabase,
    database: databaseName,
    host: hostDatabase,
    dialect: dialectDatabase,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
