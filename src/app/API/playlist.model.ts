import { Song } from './song.model';
export class Playlists {
  public name: string;
  public songs: Song[];
  public id: string;
  public userID: string;

  constructor(name: string, songs: Song[], id: string, userID: string) {
    this.name = name;
    for (let i = 0; i < songs.length; i++) {
      this.songs[i] = songs[i];
    }
    this.id = id;
    this.userID = userID;
  }
}
