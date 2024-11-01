import Sequelize, { importModels } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";
import getDirname from 'utils/getDirname';

const __dirname = getDirname()

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: 'localhost',
  port: Number(process.env.MYSQL_PORT),
  models: await importModels(__dirname + './models/*.model.ts'),
  define: {
    underscored: true
  }
})

try {
  await sequelize.authenticate();
  if (process.env.NODE_ENV !== 'production') {
    console.log('DB connection has been established.')
  }
} catch (error) {
  console.error('Unable to connect to DB: ', error)
}

export default sequelize;