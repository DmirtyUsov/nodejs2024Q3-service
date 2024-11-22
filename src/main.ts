import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MyLoggerService } from './my-logger/my-logger.service';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const myLogger = app.get(MyLoggerService);
  app.useLogger(myLogger);

  const level = app.get(ConfigService).get<number>('MY_LOGGER_LEVEL');
  myLogger.setLoggingLevel(level);

  // For easy checking of ON levels
  const levelOn = `level is ON`;
  const ctx = 'MyLogger from main.ts';
  myLogger.error(`Error ${levelOn}`, '', ctx);
  myLogger.warn(`Warn ${levelOn}`, ctx);
  myLogger.log(`Log ${levelOn}`, ctx);
  myLogger.debug(`Debug ${levelOn}`, ctx);
  myLogger.verbose(`Verbose ${levelOn}`, ctx);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service. Part III')
    .setVersion('1.0')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  const port = app.get(ConfigService).get<number>('PORT') || 4000;

  await app.listen(port);
}
bootstrap();
