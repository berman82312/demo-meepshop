import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

export function getDirname () {
  return dirname(fileURLToPath(import.meta.url))
}

export default getDirname