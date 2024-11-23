import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { join, parse } from 'node:path';
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  WriteStream,
} from 'node:fs';

const MyLogLevel = {
  0: ['error'],
  1: ['error', 'warn'],
  2: ['error', 'warn', 'log'],
  3: ['error', 'warn', 'log', 'debug'],
  4: ['error', 'warn', 'log', 'debug', 'verbose'],
};

type ActiveFile = {
  path: string;
  stream: WriteStream;
  fileSize: number;
};

const DIR_NAME = 'logs';
const FILE_NAME_ALL = 'all';
const FILE_NAME_ERRORS = 'errors';
const FILE_EXT = 'log';
const FILE_IDX_START = 0;
const FILE_IDX_SPLITTER = '-';

const KB_TO_BYTES = 1024;
const MIN_FILE_SIZE_KB = 1;

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  private fileSizeMax: number;
  private dirName = join(__dirname, '..', '..', DIR_NAME);
  private logActiveFile: ActiveFile;
  private errorActiveFile: ActiveFile;

  constructor(ctx: string) {
    super(ctx);
    this.logActiveFile = this.makeActiveFile(
      this.dirName,
      FILE_NAME_ALL,
      FILE_IDX_START,
      FILE_EXT,
    );

    this.errorActiveFile = this.makeActiveFile(
      this.dirName,
      FILE_NAME_ERRORS,
      FILE_IDX_START,
      FILE_EXT,
    );
    this.setFileSize(MIN_FILE_SIZE_KB);
  }

  log(message: unknown, context?: string) {
    const level: LogLevel = 'log';
    const entry = `${context}\t${message}`;
    if (this.isLevelEnabled(level)) {
      this.logToFile(entry, level);
    }
    super.log(message, context);
  }

  error(message: unknown, stack?: unknown, context?: unknown): void {
    const level: LogLevel = 'error';
    const entry = `${context}\t${message}\t${stack}`;
    if (this.isLevelEnabled(level)) {
      this.logToFile(entry, level);
    }
    super.error(message, stack, context);
  }

  debug(message: unknown, context?: unknown, ...rest: unknown[]): void {
    const level: LogLevel = 'debug';
    const entry = `${context}\t${message}`;
    if (this.isLevelEnabled(level)) {
      this.logToFile(entry, level);
    }
    super.debug(message, context, ...rest);
  }

  warn(message: unknown, context?: unknown, ...rest: unknown[]): void {
    const level: LogLevel = 'warn';
    const entry = `${context}\t${message}`;
    if (this.isLevelEnabled(level)) {
      this.logToFile(entry, level);
    }
    super.warn(message, context, ...rest);
  }

  verbose(message: unknown, context?: unknown, ...rest: unknown[]): void {
    const level: LogLevel = 'verbose';
    const entry = `${context}\t${message}`;
    if (this.isLevelEnabled(level)) {
      this.logToFile(entry, level);
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

  protected async logToFile(entry: string, level: LogLevel) {
    const formattedEntry = `[${level.toUpperCase()}]\t${Intl.DateTimeFormat(
      'en-GB',
      {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    ).format(new Date())}\t${entry}\n`;

    try {
      this.writeToStream(formattedEntry, this.logActiveFile);
      if (level === 'error') {
        this.writeToStream(formattedEntry, this.errorActiveFile);
      }
    } catch (e) {
      if (e instanceof Error) {
        this.error(e.message);
      }
    }
  }

  private makeFileName(
    fileName: string,
    fileIdx: number,
    fileType: string,
  ): string {
    return `${fileName}${FILE_IDX_SPLITTER}${fileIdx}.${fileType}`;
  }

  private checkFileFull(message: string, activeFile: ActiveFile): boolean {
    const messageSize = this.getMessageSize(message);
    const newFileSize = activeFile.fileSize + messageSize;

    return this.fileSizeMax < newFileSize;
  }

  private getMessageSize(message): number {
    return Buffer.byteLength(message, 'utf-8');
  }

  private async writeToStream(
    message: string,
    activeFile: ActiveFile,
  ): Promise<void> {
    const isFileFull = this.checkFileFull(message, activeFile);

    if (isFileFull) {
      this.rotateActiveFile(activeFile);
    }

    activeFile.stream.write(message);
    activeFile.fileSize += this.getMessageSize(message);
  }

  private getNameAndNextIdx(nameWithIdx: string): {
    name: string;
    idx: number;
  } {
    const parts = nameWithIdx.split(FILE_IDX_SPLITTER);
    const currentIdx = +parts[1];
    const name = parts[0];
    let idx = FILE_IDX_START;
    if (currentIdx !== undefined) {
      idx = currentIdx + 1;
    }
    return { name, idx };
  }

  private rotateActiveFile(activeFile: ActiveFile): void {
    activeFile.stream.end();
    const { name: nameWithIdx, dir } = parse(activeFile.path);
    const { name, idx } = this.getNameAndNextIdx(nameWithIdx);

    const newActiveFile = this.makeActiveFile(dir, name, idx, FILE_EXT, false);
    activeFile.fileSize = newActiveFile.fileSize;
    activeFile.path = newActiveFile.path;
    activeFile.stream = newActiveFile.stream;
  }

  private makeActiveFile(
    path: string,
    fileName: string,
    fileIdx: number,
    fileExt: string,
    checkLastSaved = true,
  ): ActiveFile {
    let prevFileName = '';
    let fileSize = 0;

    if (checkLastSaved) {
      prevFileName = this.getLastSavedFileName(path, fileName);
    }

    try {
      if (prevFileName) {
        fileSize = statSync(join(path, prevFileName)).size;
      }

      const activeFileName = prevFileName
        ? prevFileName
        : this.makeFileName(fileName, fileIdx, fileExt);

      const pathActiveFile = join(path, activeFileName);

      const stream = createWriteStream(pathActiveFile, {
        flags: 'a',
      });

      return { path: pathActiveFile, stream, fileSize };
    } catch (e) {
      if (e instanceof Error) {
        this.error(e.message);
      }
    }
  }

  private getLastSavedFileName(path: string, fileName: string): string {
    try {
      if (!existsSync(path)) {
        mkdirSync(path);
        return '';
      }

      const dirEntries = readdirSync(path, { withFileTypes: true });

      const filteredFiles = dirEntries.filter(
        (entry) => entry.isFile() && entry.name.startsWith(fileName),
      );

      const sortedFiles = filteredFiles
        .map(({ name }) => {
          const idx = name.split('.')[0].split(FILE_IDX_SPLITTER)[1];
          return { name, idx: +idx };
        })
        .sort((a, b) => b.idx - a.idx);

      if (sortedFiles.length) {
        const prevFile = sortedFiles[0];
        const prevFileName = prevFile.name;
        return prevFileName;
      }
      return '';
    } catch (error) {
      if (error instanceof Error) {
        this.error(error.message);
      }
    }
  }
}
