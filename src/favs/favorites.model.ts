export interface FavoritesModel {
  artist: Set<string>; // favorite artists ids
  album: Set<string>; // favorite albums ids
  track: Set<string>; // favorite tracks ids
}
