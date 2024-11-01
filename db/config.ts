import Sequelize, { importModels } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { Account } from "./models/Account.model";

const __dirname = dirname(fileURLToPath(import.meta.url))

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: 'localhost',
  port: Number(process.env.MYSQL_PORT),
  models: [Account],
  define: {
    underscored: true
  }
})

export async function initDB () {
  try {
    await sequelize.authenticate();
    if (process.env.NODE_ENV !== 'production') {
      console.log('DB connection has been established.')
    }
  } catch (error) {
    console.error('Unable to connect to DB: ', error)
  }
}

export default sequelize;