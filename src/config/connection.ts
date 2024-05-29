import { Dialect, Sequelize } from "sequelize";

const databaseName = process.env.DATABASE_NAME as string;
const userNameDatabase = process.env.USERNAME_DATABASE || "root";
const passDatabase = process.env.PASS_DATABASE || undefined;
const hostDatabase = process.env.HOST_DATABASE || "localhost";
const dialectDatabase: Dialect = (process.env.DIALECT_DATABASE as Dialect) || ("mysql" as Dialect);

const sequelize = new Sequelize(databaseName, userNameDatabase, passDatabase, {
  host: hostDatabase,
  dialect: dialectDatabase,
});

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

checkConnection();

export default sequelize;
