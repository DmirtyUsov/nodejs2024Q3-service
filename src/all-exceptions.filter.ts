import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
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

    Logger.error(`${error.message}`, '', AllExceptionsFilter.name);

    super.catch(exception, host);
  }
}
