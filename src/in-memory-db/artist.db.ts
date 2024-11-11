import { ArtistModel } from 'src/artist/artist.model';
import { InMemoryDB } from './in-memory-db';

export class ArtistDB extends InMemoryDB<ArtistModel> {}
