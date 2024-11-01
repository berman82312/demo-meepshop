import { SequelizeStorage, Umzug } from "umzug";
import sequelize from "./config";
import esMain from "es-main";
import getDirname from "utils/getDirname";

const __dirname = getDirname()

export const umzug = new Umzug({
  migrations: { glob: ['migrations/*.ts', { cwd: __dirname }] },
  context: sequelize,
  storage: new SequelizeStorage({ sequelize }),
  logger: console
})

if (esMain(import.meta)) {
  umzug.runAsCLI()
}

export type Migration = typeof umzug._types.migration