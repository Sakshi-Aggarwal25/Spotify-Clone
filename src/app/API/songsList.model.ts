import { Song } from './song.model';
export class SongsList {
  public songs: Song[];

  constructor(songs: Song[]) {
    for (let i = 0; i < songs.length; i++) {
      this.songs[i] = songs[i];
    }
  }
}
