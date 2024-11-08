import { Global, Module } from '@nestjs/common';
import { MyDBService } from './mydb.service';

@Global()
@Module({
  providers: [MyDBService],
  exports: [MyDBService],
})
export class MyDbModule {}
