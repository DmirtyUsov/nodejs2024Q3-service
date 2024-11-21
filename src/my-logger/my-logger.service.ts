import { ConsoleLogger, Injectable } from '@nestjs/common';
import { join } from 'node:path';
import { appendFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
@Injectable()
export class MyLoggerService extends ConsoleLogger {
  private dirName = join(__dirname, '..', '..', 'logs');
  private logFilePath = join(this.dirName, 'myLogFile.log');

  log(message: unknown, context?: string) {
    const entry = `${context}\t${message}`;
    this.logToFile(entry);
    super.log(message, context);
  }

  error(message: unknown, stack?: unknown, context?: unknown): void {
    const entry = `${context}\t${message}\t${stack}`;
    this.logToFile(entry);
    super.error(message, stack, context);
  }

  protected async logToFile(entry: string) {
    const formattedEntry = `${Intl.DateTimeFormat('en-GB', {
      dateStyle: 'short',
      timeStyle: 'medium',
    }).format(new Date())}\t${entry}\n`;

    try {
      if (!existsSync(this.dirName)) {
        await mkdir(this.dirName);
      }
      await appendFile(this.logFilePath, formattedEntry);
    } catch (e) {
      if (e instanceof Error) {
        this.error(e.message);
      }
    }
  }
}
