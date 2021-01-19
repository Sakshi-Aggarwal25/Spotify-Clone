import { Song } from './song.model';
export class Charts {
  public name: string;
  public songs: Song[];
  public id: string;

  constructor(name: string, songs: Song[], id: string) {
    this.name = name;
    for (let i = 0; i < songs.length; i++) {
      this.songs[i] = songs[i];
    }
    this.id = id;
  }
}
