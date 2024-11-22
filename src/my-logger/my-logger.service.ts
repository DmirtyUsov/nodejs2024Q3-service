import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { join } from 'node:path';
import { mkdir, readdir } from 'node:fs/promises';
import { createWriteStream, existsSync, WriteStream } from 'node:fs';

const MyLogLevel = {
  0: ['error'],
  1: ['error', 'warn'],
  2: ['error', 'warn', 'log'],
  3: ['error', 'warn', 'log', 'debug'],
  4: ['error', 'warn', 'log', 'debug', 'verbose'],
};

type ActiveFile = {
  stream: WriteStream;
  fileSize: number;
};

const DIR_NAME = 'logs';
const FILE_NAME_ALL = 'all';
const FILE_NAME_ERRORS = 'errors';
const FILE_TYPE = 'log';
const FILE_COUNT_START = 0;

const KB_TO_BYTES = 1024;
const MIN_FILE_SIZE_KB = 1;

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  private fileSizeMax: number = MIN_FILE_SIZE_KB;
  private dirName = join(__dirname, '..', '..', DIR_NAME);
  private logFilePath = join(this.dirName, `${FILE_NAME_ALL}.${FILE_TYPE}`);
  private logStream: WriteStream;
  private errorFilePath = join(this.dirName, 'myLogFile.log');

  constructor(ctx: string) {
    super(ctx);
    this.logStream = this.makeStream(this.dirName, FILE_NAME_ALL, FILE_TYPE);
  }

  log(message: unknown, context?: string) {
    const level: LogLevel = 'log';
    const entry = `${context}\t${message}`;
    if (this.isLevelEnabled(level)) {
      this.logToFile(entry);
    }
    super.log(message, context);
  }

  error(message: unknown, stack?: unknown, context?: unknown): void {
    const level: LogLevel = 'error';
    const entry = `${context}\t${message}\t${stack}`;
    if (this.isLevelEnabled(level)) {
      this.logToFile(entry);
    }
    super.error(message, stack, context);
  }

  debug(message: unknown, context?: unknown, ...rest: unknown[]): void {
    const level: LogLevel = 'debug';
    const entry = `${context}\t${message}`;
    if (this.isLevelEnabled(level)) {
      this.logToFile(entry);
    }
    super.debug(message, context, ...rest);
  }

  warn(message: unknown, context?: unknown, ...rest: unknown[]): void {
    const level: LogLevel = 'warn';
    const entry = `${context}\t${message}`;
    if (this.isLevelEnabled(level)) {
      this.logToFile(entry);
    }
    super.warn(message, context, ...rest);
  }

  verbose(message: unknown, context?: unknown, ...rest: unknown[]): void {
    const level: LogLevel = 'verbose';
    const entry = `${context}\t${message}`;
    if (this.isLevelEnabled(level)) {
      this.logToFile(entry);
    }
    super.verbose(message, context, ...rest);
  }

  setLoggingLevel(level: number): void {
    const baseLevels = MyLogLevel[1];
    const levels: LogLevel[] = MyLogLevel[level] || baseLevels;
    this.setLogLevels(levels);
  }

  setFileSize(sizeKb: number): void {
    this.fileSizeMax =
      (sizeKb < MIN_FILE_SIZE_KB ? MIN_FILE_SIZE_KB : sizeKb) * KB_TO_BYTES;
  }

  protected async logToFile(entry: string) {
    const formattedEntry = `${Intl.DateTimeFormat('en-GB', {
      dateStyle: 'short',
      timeStyle: 'medium',
    }).format(new Date())}\t${entry}\n`;

    try {
      this.logStream.write(formattedEntry);
    } catch (e) {
      if (e instanceof Error) {
        this.error(e.message);
      }
    }
  }

  private makeStream(
    path: string,
    fileName: string,
    fileType: string,
  ): WriteStream {
    let prevFileName = '';

    try {
      (async () => {
        if (!existsSync(path)) {
          await mkdir(path);
        } else {
          const files = await readdir(path);
          const filteredFiles = files.filter((file) =>
            file.startsWith(fileName),
          );
          prevFileName = filteredFiles.at(-1);
        }
      })();

      const activeFileName = prevFileName
        ? prevFileName
        : `${fileName}-0.${fileType}`;

      const pathActiveFile = join(path, activeFileName);

      return createWriteStream(pathActiveFile, {
        flags: 'a',
      });
    } catch (e) {
      if (e instanceof Error) {
        this.error(e.message);
      }
    }
  }
}
