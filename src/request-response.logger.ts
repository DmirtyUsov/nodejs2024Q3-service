import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function loggerRequestResponse(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.on('finish', () => {
    const { method, originalUrl, body, params } = req;
    const { statusCode } = res;
    const message = `${method} ${originalUrl} params: ${JSON.stringify(
      params,
    )} body: ${JSON.stringify(body)} -> RESPONSE: ${statusCode}`;
    Logger.log(message, 'loggerRequestResponse');
  });

  next();
}
