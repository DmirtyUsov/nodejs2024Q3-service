import { TrackModel } from 'src/track/track.model';
import { InMemoryDB } from './in-memory-db';

export class TrackDB extends InMemoryDB<TrackModel> {}
