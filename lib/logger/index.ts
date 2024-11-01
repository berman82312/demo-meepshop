import fileLogger from "./fileLogger";

export function getLogger(logType?: string) {
  switch(logType) {
    case 'file':
      return fileLogger
    default:
      return console
  }
}
