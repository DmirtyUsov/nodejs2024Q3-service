import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { MyLoggerService } from './my-logger/my-logger.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger: MyLoggerService = new MyLoggerService(
    AllExceptionsFilter.name,
  );

  catch(exception: unknown, host: ArgumentsHost): void {
    const error = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    };

    if (exception instanceof HttpException) {
      error.message = `${exception.name} Code: ${exception.getStatus()} ${
        exception.message
      }`;
    }

    if (exception instanceof PrismaClientValidationError) {
      error.statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      error.message = exception.message;
    }

    this.logger.error(`${error.message}`, '', AllExceptionsFilter.name);

    super.catch(exception, host);
  }
}
