import { Injectable } from '@nestjs/common';
import { ArtistDB } from 'src/in-memory-db/artist.db';
import { UserDB } from 'src/in-memory-db/user.db';

@Injectable()
export class MyDBService {
  user = new UserDB();
  artist = new ArtistDB();
}
