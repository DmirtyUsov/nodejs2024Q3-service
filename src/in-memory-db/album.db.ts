import { AlbumModel } from 'src/album/album.model';
import { InMemoryDB } from './in-memory-db';

export class AlbumDB extends InMemoryDB<AlbumModel> {}
