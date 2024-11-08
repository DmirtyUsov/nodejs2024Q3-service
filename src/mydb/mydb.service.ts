import { Injectable } from '@nestjs/common';
import { UserDB } from 'src/in-memory-db/user.db';

@Injectable()
export class MyDBService {
  user = new UserDB();
}
