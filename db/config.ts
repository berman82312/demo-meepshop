import Sequelize from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";
import { Account } from "./models/Account.model";

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  models: [Account],
  define: {
    underscored: true
  }
})

export async function initDB () {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error('Unable to connect to DB: ', error)
  }
}

export default sequelize;