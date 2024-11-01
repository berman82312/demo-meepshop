import { SequelizeStorage, Umzug } from "umzug";
import sequelize from "./config";
import esMain from "es-main";
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

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