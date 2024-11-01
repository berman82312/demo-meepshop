import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname } from "path";
import { LoggerInterface } from "./base";

const __dirname = dirname(fileURLToPath(import.meta.url));

class FileLogger implements LoggerInterface {
  logFilePath: string = __dirname + "/../../tmp/logs";

  constructor(filePath?: string) {
    if (filePath) {
      this.logFilePath = filePath;
    }
  }

  log(message?: string): void {
    this._writeLog("log", message);
  }

  info(message?: string): void {
    this._writeLog("info", message);
  }

  warn(message?: string): void {
    this._writeLog("warn", message);
  }

  error(message?: string): void {
    this._writeLog("error", message);
  }

  debug(message?: string): void {
    this._writeLog("debug", message);
  }

  trace(message?: string): void {
    this._writeLog("trace", message);
  }

  _writeLog(level: string, message?: string) {
    const time = new Date().toISOString();
    const data = `[${time}][${level}]${message}\n`;
    if (!fs.existsSync(this.logFilePath)) {
      fs.mkdirSync(this.logFilePath, { recursive: true });
    }
    const fullFilePath = `${this.logFilePath}/${time.slice(0, 10)}.log`;
    fs.appendFile(fullFilePath, data, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
}

export default new FileLogger();
