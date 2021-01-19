import { Playlists } from '../API/playlist.model';
export class RegisteredUser {
  public name: string;
  public password: string;
  public confirmPassword: string;
  public email: string;
  public phone: number;
//   public playlists: Playlists[]; //Not required
  public id: string;

  constructor(
    name: string,
    password: string,
    confirmPassword: string,
    email: string,
    phone: number,
    // playlists: Playlists[],
    id: string
  ) {
    this.name = name;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.email = email;
    this.id = id;
    this.phone = phone;

    // for (let i = 0; i < playlists.length; i++) {
    //   this.playlists[i].name = playlists[i].name;
    //   for (let j = 0; j < playlists[i].songs.length; j++) {
    //     this.playlists[i].songs[j] = playlists[i].songs[j];
    //   }
    // }
  }
}
